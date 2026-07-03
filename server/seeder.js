import dotenv from "dotenv";
dotenv.config();

import { sequelize } from "./config/db.js";
import seedAdmin from "./seeders/adminSeeder.js";

const runSeeder = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database Connected");

    await seedAdmin();

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runSeeder();