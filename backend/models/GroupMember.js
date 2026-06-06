import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const GroupMember =
  sequelize.define("GroupMember", {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

export default GroupMember;