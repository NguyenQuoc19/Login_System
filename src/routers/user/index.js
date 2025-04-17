require("dotenv").config();

const express = require("express");
const router = express.Router();
// const { apiKey } = require("../../auth/auth.permission");

// const apiName = process.env.API_NAME || "api";
// const apiVersion = process.env.API_VERSION || "v1";

// Check API key
// router.use(apiKey, require("./user"));

module.exports = router;