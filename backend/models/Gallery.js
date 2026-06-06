import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Gallery = sequelize.define(
  "Gallery",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }
);

export default Gallery;