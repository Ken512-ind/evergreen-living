const mongoose =
  require("mongoose");

const connectDB =
  async () => {
    try {
      console.log(
        "Connecting to MongoDB..."
      );

      await mongoose.connect(
        process.env.MONGO_URI,
        {
          serverSelectionTimeoutMS: 15000,
        }
      );

      console.log(
        "MongoDB connected"
      );

    } catch (error) {
      console.error(
        "MongoDB connection error:"
      );

      console.error(
        error.message
      );

      /*
      JANGAN crash server
      */

      console.log(
        "Server tetap berjalan tanpa database"
      );
    }
  };

module.exports =
  connectDB;