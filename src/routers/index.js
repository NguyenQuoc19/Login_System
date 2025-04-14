require("dotenv").config();

const express = require("express");
const router = express.Router();
const { getIndex } = require("../controllers/index");

const apiName = process.env.API_NAME || "api";
const apiVersion = process.env.API_VERSION || "v1";
const apiPrefix = `/${apiVersion}/${apiName}`;

// The main route for the API
router.get(`${apiPrefix}`, getIndex);

// Access routes
router.use(`${apiPrefix}/user`, require("./access"));

module.exports = router;