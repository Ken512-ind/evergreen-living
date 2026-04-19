const Plant = require("../models/Plant");

/*
GET ALL PLANTS
*/
const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({
      createdAt: -1,
    });

    res.json(plants);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
GET PLANT BY SLUG
*/
const getPlantBySlug = async (req, res) => {
  try {
    const plant = await Plant.findOne({
      slug: req.params.slug,
    });

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
      });
    }

    res.json(plant);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
CREATE PLANT
*/
const createPlant = async (req, res) => {
  try {
    const {
      name,
      latin,
      category,
      image,
      description,
    } = req.body;

    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-");

    const plant = await Plant.create({
      name,
      latin,
      category,
      image,
      description,
      slug,
    });

    res.status(201).json({
      message: "Plant created",
      plant,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
UPDATE PLANT
*/
const updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findById(
      req.params.id
    );

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
      });
    }

    plant.name =
      req.body.name || plant.name;

    plant.latin =
      req.body.latin || plant.latin;

    plant.category =
      req.body.category || plant.category;

    plant.image =
      req.body.image || plant.image;

    plant.description =
      req.body.description ||
      plant.description;

    await plant.save();

    res.json({
      message: "Plant updated",
      plant,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
DELETE PLANT
*/
const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findById(
      req.params.id
    );

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
      });
    }

    await plant.deleteOne();

    res.json({
      message: "Plant deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPlants,
  getPlantBySlug,
  createPlant,
  updatePlant,
  deletePlant,
};