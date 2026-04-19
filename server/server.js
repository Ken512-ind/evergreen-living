require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const plantRoutes = require("./routes/plantRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

/*
CONNECT DATABASE
*/
connectDB();

/*
MIDDLEWARE
*/
app.use(cors());
app.use(express.json());

/*
ROUTES
*/
app.use("/api/plants", plantRoutes);
app.use("/api/auth", authRoutes);

/*
TEST ROUTE
*/
app.get("/", (req, res) => {
  res.send("API is running...");
});

/*
SERVER
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});