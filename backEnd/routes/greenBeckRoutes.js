const express = require("express");
const {
  getAllGreenBecks,
  getSingleGreenBeck,
  createGreenBeck,
} = require("../controllers/greenBeckController");

const requireAuth = require('../middleware/requireAuth');



const router = express.Router();
router.use(requireAuth);

// Get all entries
router.get("/", getAllGreenBecks);

// Get a single entry
router.get("/:id", getSingleGreenBeck);

// Create a new entry
router.post("/", createGreenBeck);

module.exports = router;

