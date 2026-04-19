const express = require("express");
const router = express.Router();

const {
  getPlants,
  getPlantBySlug,
  createPlant,
  updatePlant,
  deletePlant,
} = require("../controllers/plantController");

/*
GET ALL
*/
router.get("/", getPlants);

/*
GET BY SLUG
*/
router.get("/:slug", getPlantBySlug);

/*
CREATE
*/
router.post("/", createPlant);

/*
UPDATE
*/
router.put("/:id", updatePlant);

/*
DELETE
*/
router.delete("/:id", deletePlant);

module.exports = router;