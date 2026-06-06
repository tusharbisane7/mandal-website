import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Group = sequelize.define("Group", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    defaultValue: "",
  },

  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Group;