const { GreenBeck } = require("../models");

// Get all entries
const getAllGreenBecks = async (req, res) => {
  try {
    const allEntries = await GreenBeck.findAll();
    res.status(200).json(allEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single entry by ID
const getSingleGreenBeck = async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await GreenBeck.findByPk(id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new entry
const createGreenBeck = async (req, res) => {
  const { name, age, email } = req.body;
  try {
    const newEntry = await GreenBeck.create({ name, age, email });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllGreenBecks,
  getSingleGreenBeck,
  createGreenBeck,
};
