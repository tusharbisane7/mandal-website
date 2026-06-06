import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Notice = sequelize.define("Notice", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  fileUrl: {
    type: DataTypes.STRING,
    defaultValue: "",
  },

  isNew: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Notice;