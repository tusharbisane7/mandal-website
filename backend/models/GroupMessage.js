import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const GroupMessage =
  sequelize.define("GroupMessage", {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

export default GroupMessage;