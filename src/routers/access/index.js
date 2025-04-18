const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");
const { asyncHandle } = require("../../utils");

// Sign up route API
router.post("/sign_up", asyncHandle(accessController.signUp));
router.post("/login", asyncHandle(accessController.login));

module.exports = router;