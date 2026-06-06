import {
  DataTypes,
} from "sequelize";

import sequelize from
"../config/database.js";

const Complaint =
sequelize.define(
  "Complaint",
  {
    subject:
    DataTypes.STRING,

    message:
    DataTypes.TEXT,

    status: {
      type:
      DataTypes.STRING,

      defaultValue:
      "Pending",
    },
  }
);

export default Complaint;