import {
  useState,
  useEffect,
  useRef,
} from "react";

import MessageBubble from "./MessageBubble";
import API from "../../../services/axios";
import socket from "../../../services/socket";

function ChatRoom({
  user,
  goBack,
}) {

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    messages,
    setMessages,
  ] = useState([]);

  const [
    typing,
    setTyping,
  ] = useState("");

  const [
    notificationPermission,
    setNotificationPermission,
  ] = useState(false);

  const bottomRef =
    useRef(null);

  useEffect(() => {

    if (
      Notification.permission ===
      "granted"
    ) {

      setNotificationPermission(
        true
      );

    } else {

      Notification
        .requestPermission()
        .then(permission => {

          if (
            permission ===
            "granted"
          ) {

            setNotificationPermission(
              true
            );

          }

        });

    }

  }, []);

  useEffect(() => {

    loadMessages();

    socket.emit(
      "join",
      currentUser.id
    );

    socket.on(
      "receive-message",
      (data) => {

        if (
          data.senderId ===
            user.id ||
          data.receiverId ===
            user.id
        ) {

          setMessages(
            prev => [
              ...prev,
              data,
            ]
          );

          if (
            notificationPermission &&
            data.senderId ===
              user.id
          ) {

            new Notification(
              user.fullName,
              {
                body:
                  data.message,
              }
            );

          }

        }

      }
    );

    socket.on(
      "message-deleted",
      (messageId) => {

        setMessages(
          prev =>
            prev.map(
              msg =>

                msg.id ===
                messageId

                  ? {
                      ...msg,
                      deletedForEveryone:
                        true,
                    }

                  : msg
            )
        );

      }
    );

    socket.on(
      "user-typing",
      (name) => {

        setTyping(
          `${name} is typing...`
        );

        setTimeout(
          () =>
            setTyping(""),
          2000
        );

      }
    );

    return () => {

      socket.off(
        "receive-message"
      );

      socket.off(
        "message-deleted"
      );

      socket.off(
        "user-typing"
      );

    };

  }, [
    user,
    notificationPermission,
  ]);

  useEffect(() => {

    bottomRef.current?.
      scrollIntoView({
        behavior:
          "smooth",
      });

  }, [messages]);

  useEffect(() => {

    messages.forEach(
      msg => {

        if (

          msg.senderId ===
            user.id &&

          msg.seen !==
            "seen"

        ) {

          socket.emit(
            "message-seen",
            msg.id
          );

        }

      }
    );

  }, [
    messages,
    user.id,
  ]);

  const loadMessages =
    async () => {

      try {

        const res =
          await API.get(
            `/chat/messages/${currentUser.id}/${user.id}`
          );

        setMessages(
          res.data
        );

      } catch (error) {

        console.log(
          error
        );

      }

    };

  const sendMessage =
    () => {

      if (
        !message.trim()
      )
        return;

      const data = {

        senderId:
          currentUser.id,

        receiverId:
          user.id,

        message,

      };

      socket.emit(
        "send-message",
        data
      );

      setMessages(
        prev => [
          ...prev,
          {
            ...data,
            seen: "sent",
            createdAt:
              new Date(),
          },
        ]
      );

      setMessage("");

    };

  const deleteForEveryone =
    (messageId) => {

      socket.emit(
        "delete-message",
        messageId
      );

    };

  return (

    <div className="chat-room">

      <div className="chat-top">

        <button
          className="back-btn"
          onClick={goBack}
        >
          ←
        </button>

        <img
          src={
            user.profilePic
              ? `http://localhost:5000/${user.profilePic}`
              : "/user.png"
          }
          alt=""
          className="chat-user-dp"
        />

        <div className="chat-user-info">

          <h4>
            {user.fullName}
          </h4>

          <small>

            {
              user.online

                ? "🟢 Online"

                : user.lastSeen

                ? `Last Seen ${new Date(
                    user.lastSeen
                  ).toLocaleString()}`

                : "⚫ Offline"
            }

          </small>

        </div>

      </div>

      <div className="messages">

        {
          messages.map(
            (
              msg,
              index
            ) => (

              <div
                key={index}
                className="message-wrapper"
              >

                <MessageBubble
                  text={
                    msg.deletedForEveryone
                      ? "🚫 Message Deleted"
                      : msg.message
                  }
                  mine={
                    msg.senderId ===
                    currentUser.id
                  }
                  time={
                    msg.createdAt
                      ? new Date(
                          msg.createdAt
                        ).toLocaleTimeString(
                          [],
                          {
                            hour:
                              "2-digit",
                            minute:
                              "2-digit",
                          }
                        )
                      : ""
                  }
                  status={
                    msg.seen
                  }
                />

                {
                  msg.senderId ===
                    currentUser.id &&
                  !msg.deletedForEveryone && (

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteForEveryone(
                          msg.id
                        )
                      }
                    >
                      Delete
                    </button>

                  )
                }

              </div>

            )
          )
        }

        {typing && (

          <div
            className="typing-box"
          >
            {typing}
          </div>

        )}

        <div
          ref={bottomRef}
        />

      </div>

      <div className="chat-send">

        <input
          value={message}
          onChange={(e) => {

            setMessage(
              e.target.value
            );

            socket.emit(
              "typing",
              {
                senderName:
                  currentUser.fullName,

                receiverId:
                  user.id,
              }
            );

          }}
          placeholder="Type a message..."
          onKeyDown={(e) => {

            if (
              e.key ===
              "Enter"
            ) {

              sendMessage();

            }

          }}
        />

        <button
          onClick={
            sendMessage
          }
        >
          ➤
        </button>

      </div>

    </div>

  );

}

export default ChatRoom;