import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Chat = sequelize.define(
  "Chat",
  {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

   seen: {
  type: DataTypes.STRING,
  defaultValue: "sent"
},

    deletedForEveryone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }
);

export default Chat;