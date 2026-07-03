import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import plantRoutes from "./routes/plantRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/*
DATABASE
*/

console.log("Connecting to MySQL...");

await connectDB();

console.log("MySQL connected successfully!");

/*
MIDDLEWARE
*/

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/*
ROUTES
*/

app.use("/api/auth", authRoutes);

app.use("/api/plants", plantRoutes);

/*
HEALTH CHECK
*/

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    database: "MySQL",
  });
});

/*
404
*/

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

/*
ERROR HANDLER
*/

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: err.message,
  });
});

/*
START SERVER
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});