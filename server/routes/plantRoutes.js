const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getPlants,
  getPlantBySlug,
  createPlant,
  updatePlant,
  deletePlant,
  getPlantsByCategory,
} = require("../controllers/plantController");

/*
MULTER SETUP FOR FILE UPLOAD
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

/*
PUBLIC ROUTES - ORDER MATTERS!
Specific routes HARUS sebelum generic routes
*/

// GET ALL PLANTS (paling generic)
router.get("/", getPlants);

// GET PLANTS BY CATEGORY (lebih specific)
router.get("/category/:category", getPlantsByCategory);

// GET PLANT BY SLUG (paling specific)
router.get("/:slug", getPlantBySlug);

/*
ADMIN ROUTES (Protected) - These come after GET routes
*/

// CREATE PLANT
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createPlant
);

// UPDATE PLANT
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updatePlant
);

// DELETE PLANT
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deletePlant
);

module.exports = router;