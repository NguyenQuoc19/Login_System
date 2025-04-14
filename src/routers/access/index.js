const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");

// Sign up route API
router.post("/sign_up", accessController.signUp);

module.exports = router;