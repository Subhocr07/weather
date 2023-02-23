const express = require("express");
const router = express.Router();
const axios = require("axios");
const signupController = require("../controllers/signup.js");
const loginController = require("../controllers/login.js");
const weatherController = require("../controllers/weather.js");

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/weather", weatherController);

export default router;
