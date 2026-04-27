const Plant =
  require("../models/Plant");

/*
GET ALL
*/

const getPlants =
  async (req, res) => {
    try {
      console.log(
        "GET PLANTS CALLED"
      );

      const plants =
        await Plant.find();

      res.json(plants);

    } catch (error) {
      console.error(
        "ERROR getPlants:",
        error.message
      );

      res.status(500).json({
        message:
          "Failed to fetch plants",
      });
    }
  };

/*
GET BY SLUG
*/

const getPlantBySlug =
  async (req, res) => {
    try {
      const { slug } =
        req.params;

      const plant =
        await Plant.findOne({
          slug,
        });

      if (!plant) {
        return res
          .status(404)
          .json({
            message:
              "Plant not found",
          });
      }

      res.json(plant);

    } catch (error) {
      console.error(
        "ERROR getPlantBySlug:",
        error.message
      );

      res.status(500).json({
        message:
          "Failed to fetch plant",
      });
    }
  };

module.exports = {
  getPlants,
  getPlantBySlug,
};