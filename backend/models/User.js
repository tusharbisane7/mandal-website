import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
online: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
},

lastSeen: {
  type: DataTypes.DATE,
  allowNull: true,
},
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  age: {
    type: DataTypes.INTEGER,
  },

  address: {
    type: DataTypes.TEXT,
  },

  mobile: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
  },

  profilePic: {
    type: DataTypes.STRING,
    defaultValue: "",
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
});

export default User;