'use strict'

const express = require("express");
const router = express.Router();
const { getIndex } = require("../controllers/index");

// The main route for the API
router.get("/", getIndex);

module.exports = router;