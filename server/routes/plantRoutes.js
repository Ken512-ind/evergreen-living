import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  getPlants,
  getPlantBySlug,
  getPlantsByCategory,
  createPlant,
  updatePlant,
  deletePlant,
} from "../controllers/plantController.js";

const router = express.Router();

/*
====================================
PUBLIC ROUTES
====================================
*/

router.get("/", getPlants);

router.get("/category/:category", getPlantsByCategory);

router.get("/:slug", getPlantBySlug);

/*
====================================
ADMIN ROUTES
====================================
*/

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createPlant
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updatePlant
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deletePlant
);

export default router;