import Plant from "../models/Plant.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedCategories = [
  "Indoor",
  "Outdoor",
  "Herbal",
];

const allowedDifficulty = [
  "Easy",
  "Medium",
  "Hard",
];

/*
====================================
GET ALL PLANTS
====================================
*/

const getPlants = async (req, res) => {
  try {
    const plants = await Plant.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(plants);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch plants",
      error: error.message,
    });
  }
};

/*
====================================
GET PLANT BY SLUG
====================================
*/

const getPlantBySlug = async (req, res) => {
  try {
    const plant = await Plant.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
      });
    }

    res.json(plant);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch plant",
      error: error.message,
    });
  }
};

/*
====================================
GET PLANTS BY CATEGORY
====================================
*/

const getPlantsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const plants = await Plant.findAll({
      where: {
        category,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(plants);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch plants",
      error: error.message,
    });
  }
};

/*
====================================
CREATE PLANT
====================================
*/

const createPlant = async (req, res) => {
  try {
    const {
      name,
      latin,
      category,
      description,
      slug,
      watering,
      sunlight,
      temperature,
      difficulty,
    } = req.body;

    if (!name || !category || !slug) {
      return res.status(400).json({
        message: "Name, category and slug are required",
      });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category",
      });
    }

    if (
      difficulty &&
      !allowedDifficulty.includes(difficulty)
    ) {
      return res.status(400).json({
        message: "Invalid difficulty",
      });
    }

    const slugExists = await Plant.findOne({
      where: {
        slug,
      },
    });

    if (slugExists) {
      return res.status(400).json({
        message: "Slug already exists",
      });
    }

    const plant = await Plant.create({
      name,
      latin,
      category,
      description,
      slug,
      watering,
      sunlight,
      temperature,
      difficulty,
      image: req.file
        ? `/uploads/${req.file.filename}`
        : null,
    });

    res.status(201).json({
      message: "Plant created successfully",
      plant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create plant",
      error: error.message,
    });
  }
};

/*
====================================
UPDATE PLANT
====================================
*/

const updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findByPk(req.params.id);

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
      });
    }

    const {
      name,
      latin,
      category,
      description,
      slug,
      watering,
      sunlight,
      temperature,
      difficulty,
    } = req.body;

    if (slug && slug !== plant.slug) {
      const exists = await Plant.findOne({
        where: {
          slug,
        },
      });

      if (exists) {
        return res.status(400).json({
          message: "Slug already exists",
        });
      }

      plant.slug = slug;
    }

    if (
      category &&
      !allowedCategories.includes(category)
    ) {
      return res.status(400).json({
        message: "Invalid category",
      });
    }

    if (
      difficulty &&
      !allowedDifficulty.includes(difficulty)
    ) {
      return res.status(400).json({
        message: "Invalid difficulty",
      });
    }

    if (req.file) {
      if (plant.image) {
        const oldImage = path.join(
          __dirname,
          "..",
          plant.image
        );

        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
      }

      plant.image = `/uploads/${req.file.filename}`;
    }

    if (name) plant.name = name;
    if (latin) plant.latin = latin;
    if (category) plant.category = category;
    if (description) plant.description = description;
    if (watering) plant.watering = watering;
    if (sunlight) plant.sunlight = sunlight;
    if (temperature) plant.temperature = temperature;
    if (difficulty) plant.difficulty = difficulty;

    await plant.save();

    res.json({
      message: "Plant updated successfully",
      plant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update plant",
      error: error.message,
    });
  }
};

/*
====================================
DELETE PLANT
====================================
*/

const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByPk(req.params.id);

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
      });
    }

    if (plant.image) {
      const imagePath = path.join(
        __dirname,
        "..",
        plant.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await plant.destroy();

    res.json({
      message: "Plant deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete plant",
      error: error.message,
    });
  }
};

export {
  getPlants,
  getPlantBySlug,
  getPlantsByCategory,
  createPlant,
  updatePlant,
  deletePlant,
};