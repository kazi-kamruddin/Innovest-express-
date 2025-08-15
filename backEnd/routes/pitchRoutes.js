const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { 
    getAllPitches,
    createPitch,
} = require("../controllers/pitchController");

const router = express.Router();

router.get("/", getAllPitches);

router.post("/", requireAuth, createPitch);

module.exports = router;
