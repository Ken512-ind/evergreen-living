const express =
  require("express");

const router =
  express.Router();

const {
  getPlants,
  getPlantBySlug,
} = require(
  "../controllers/plantController"
);

/*
GET ALL
*/

router.get(
  "/",
  getPlants
);

/*
GET BY SLUG
*/

router.get(
  "/:slug",
  getPlantBySlug
);

module.exports =
  router;