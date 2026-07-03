import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Plant = sequelize.define(
  "Plant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    latin: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    watering: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sunlight: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    temperature: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    difficulty: {
      type: DataTypes.ENUM("Easy", "Medium", "Hard"),
      defaultValue: "Easy",
    },
  },
  {
    tableName: "plants",
    timestamps: true,
  }
);

export default Plant;