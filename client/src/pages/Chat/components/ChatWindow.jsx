import {
  useState
} from "react";

function ChatWindow({
  selectedUser
}) {

  const [
    message,
    setMessage
  ] = useState("");

  if (!selectedUser) {

    return (

      <div className="chat-window">

        <div className="empty-chat">

          Select User To Start Chat

        </div>

      </div>

    );

  }

  return (

    <div className="chat-window">

      <div className="chat-header">

        {
          selectedUser.fullName
        }

      </div>

      <div className="messages">

      </div>

      <div className="chat-input">

        <input
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          placeholder="Type Message"
        />

        <button>
          Send
        </button>

      </div>

    </div>

  );

}

export default ChatWindow;