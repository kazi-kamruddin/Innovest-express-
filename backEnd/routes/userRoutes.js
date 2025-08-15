const express = require("express");
const {
  loginUser,
  signUpUser,
} = require("../controllers/userController");

const router = express.Router();

// login
router.post("/login", loginUser);

// signUp
router.post("/sign-up", signUpUser);

module.exports = router;