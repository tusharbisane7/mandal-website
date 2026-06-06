import Chat from "../models/Chat.js";
import User from "../models/User.js";

const onlineUsers = {};

export default function socketHandler(io) {

  io.on("connection", (socket) => {

    console.log("User Connected");

    socket.on("join", async (userId) => {

      onlineUsers[userId] =
        socket.id;

      await User.update(
        {
          online: true,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      io.emit(
        "online-users",
        Object.keys(
          onlineUsers
        )
      );

    });

    socket.on(
      "send-message",
      async (data) => {

        const savedMessage =
          await Chat.create({

            senderId:
              data.senderId,

            receiverId:
              data.receiverId,

            message:
              data.message,

          });

        const receiverSocket =
          onlineUsers[
            data.receiverId
          ];

        if (
          receiverSocket
        ) {

          io.to(
            receiverSocket
          ).emit(
            "receive-message",
            savedMessage
          );

        }

      }
    );


socket.on(
 "message-seen",
 async(messageId)=>{

  await Chat.update(
   {
    seen:"seen"
   },
   {
    where:{
     id:messageId
    }
   }
  );

  io.emit(
   "message-status",
   {
    messageId,
    status:"seen"
   }
  );

 }
);

    socket.on(
      "delete-message",
      async (messageId) => {

        await Chat.update(
          {
            deletedForEveryone:
              true,
          },
          {
            where: {
              id: messageId,
            },
          }
        );

        io.emit(
          "message-deleted",
          messageId
        );

      }
    );

    socket.on(
      "disconnect",
      async () => {

        let disconnectedUser =
          null;

        Object.keys(
          onlineUsers
        ).forEach(
          (userId) => {

            if (
              onlineUsers[
                userId
              ] === socket.id
            ) {

              disconnectedUser =
                userId;

              delete onlineUsers[
                userId
              ];

            }

          }
        );

        if (
          disconnectedUser
        ) {

          await User.update(
            {
              online: false,

              lastSeen:
                new Date(),
            },
            {
              where: {
                id:
                  disconnectedUser,
              },
            }
          );

        }

        io.emit(
          "online-users",
          Object.keys(
            onlineUsers
          )
        );

      }
    );

  });

}