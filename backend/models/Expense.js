import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Expense = sequelize.define(
  "Expense",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    addedBy: {
      type: DataTypes.STRING,
    },
  }
);

export default Expense;