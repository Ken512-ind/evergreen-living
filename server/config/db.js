const { Sequelize } = require("sequelize");
const path = require("path");

// Tentukan path ke file database SQLite
const dbPath = path.join(__dirname, "../database.sqlite");

// Inisialisasi Sequelize dengan SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false, // Set ke console.log jika ingin debug SQL queries
});

// Test connection
const connectDB = async () => {
  try {
    console.log("Connecting to SQLite database...");

    await sequelize.authenticate();

    console.log("SQLite database connected successfully!");

    // Sync models dengan database (create tables jika belum ada)
    await sequelize.sync({ alter: false });

    console.log("Database synchronized!");

  } catch (error) {
    console.error("SQLite connection error:", error.message);
    console.log("Server tetap berjalan, tapi database offline");
  }
};

module.exports = { sequelize, connectDB };