const Plant = require("../models/Plant");

/*
GET ALL PLANTS
*/

const getPlants = async (req, res) => {
  try {
    console.log("GET PLANTS CALLED");

    const plants = await Plant.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(plants);

  } catch (error) {
    console.error("ERROR getPlants:", error.message);
    res.status(500).json({
      message: "Failed to fetch plants",
    });
  }
};

/*
GET PLANT BY SLUG
*/

const getPlantBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const plant = await Plant.findOne({
      where: { slug },
    });

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
      });
    }

    res.json(plant);

  } catch (error) {
    console.error("ERROR getPlantBySlug:", error.message);
    res.status(500).json({
      message: "Failed to fetch plant",
    });
  }
};

/*
CREATE PLANT (Admin only)
*/

const createPlant = async (req, res) => {
  try {
    const { name, latin, category, description, slug } = req.body;

    // Validation
    if (!name || !category || !slug) {
      return res.status(400).json({
        message: "Name, category, and slug are required",
      });
    }

    // Check if slug already exists
    const existingPlant = await Plant.findOne({
      where: { slug },
    });

    if (existingPlant) {
      return res.status(400).json({
        message: "Slug already exists",
      });
    }

    // Create plant
    const plant = await Plant.create({
      name,
      latin,
      category,
      description,
      slug,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json({
      message: "Plant created successfully",
      plant,
    });

  } catch (error) {
    console.error("ERROR createPlant:", error.message);
    res.status(500).json({
      message: "Failed to create plant",
      error: error.message,
    });
  }
};

/*
UPDATE PLANT (Admin only)
*/

const updatePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, latin, category, description, slug } = req.body;

    const plant = await Plant.findByPk(id);

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
      });
    }

    // Update fields
    if (name) plant.name = name;
    if (latin) plant.latin = latin;
    if (category) plant.category = category;
    if (description) plant.description = description;
    if (slug) {
      // Check if new slug is unique
      const existingPlant = await Plant.findOne({
        where: { slug },
      });

      if (existingPlant && existingPlant.id !== plant.id) {
        return res.status(400).json({
          message: "Slug already exists",
        });
      }

      plant.slug = slug;
    }

    // Update image if provided
    if (req.file) {
      plant.image = `/uploads/${req.file.filename}`;
    }

    await plant.save();

    res.json({
      message: "Plant updated successfully",
      plant,
    });

  } catch (error) {
    console.error("ERROR updatePlant:", error.message);
    res.status(500).json({
      message: "Failed to update plant",
      error: error.message,
    });
  }
};

/*
DELETE PLANT (Admin only)
*/

const deletePlant = async (req, res) => {
  try {
    const { id } = req.params;

    const plant = await Plant.findByPk(id);

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
      });
    }

    await plant.destroy();

    res.json({
      message: "Plant deleted successfully",
      deletedPlant: plant,
    });

  } catch (error) {
    console.error("ERROR deletePlant:", error.message);
    res.status(500).json({
      message: "Failed to delete plant",
      error: error.message,
    });
  }
};

/*
GET PLANTS BY CATEGORY
*/

const getPlantsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const plants = await Plant.findAll({
      where: { category },
      order: [["createdAt", "DESC"]],
    });

    if (plants.length === 0) {
      return res.status(404).json({
        message: "No plants found in this category",
      });
    }

    res.json(plants);

  } catch (error) {
    console.error("ERROR getPlantsByCategory:", error.message);
    res.status(500).json({
      message: "Failed to fetch plants",
    });
  }
};

module.exports = {
  getPlants,
  getPlantBySlug,
  createPlant,
  updatePlant,
  deletePlant,
  getPlantsByCategory,
};