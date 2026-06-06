import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Ticker = sequelize.define(
  "Ticker",
  {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }
);

export default Ticker;