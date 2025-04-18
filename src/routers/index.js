require("dotenv").config();

const express = require("express");
const router = express.Router();
const { getIndex } = require("../controllers/index");
const { apiKey, apiKeyPermission } = require("../auth/auth.permission");

const apiName = process.env.API_NAME || "api";
const apiVersion = process.env.API_VERSION || "v1";
const apiPrefix = `/${apiVersion}/${apiName}`;

// Check API key
router.use(apiKey);
// Check API permissions
router.use(apiKeyPermission('000'));

// The main route for the API
router.get(`${apiPrefix}`, getIndex);

// Access routes
router.use(`${apiPrefix}`, require("./access"));

module.exports = router;