const mongoose =
  require("mongoose");

const plantSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      latin: {
        type: String,
      },

      category: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },

      image: {
        type: String,
      },

      slug: {
        type: String,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Plant",
    plantSchema
  );