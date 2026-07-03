import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    console.log("Connecting to MySQL...");

    await sequelize.authenticate();

    console.log("MySQL connected successfully!");

    await sequelize.sync({ alter: false });

    console.log("Database synchronized!");
  } catch (error) {
    console.error("MySQL connection error:", error.message);
  }
};

export { sequelize, connectDB };