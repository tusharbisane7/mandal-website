import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Donation = sequelize.define(
  "Donation",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
    },

    age: {
      type: DataTypes.INTEGER,
    },

    mobile: {
      type: DataTypes.STRING,
    },

    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    paymentMode: {
      type: DataTypes.STRING,
      defaultValue: "Cash",
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Paid",
    },

    receiptNumber: {
      type: DataTypes.STRING,
    },

    donationDate: {
  type: DataTypes.STRING,
},

donationTime: {
  type: DataTypes.STRING,
},

    cashierName: {
      type: DataTypes.STRING,
      defaultValue: "Mandal Cashier",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);

export default Donation;