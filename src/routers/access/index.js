const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");

const { asyncHandle } = require("../../helpers/async.handle");
const { verifyAuthentication } = require("../../auth/auth.utils");

// Sign up route API
router.post("/sign_up", asyncHandle(accessController.signUp));
router.post("/login", asyncHandle(accessController.login));

// Verify Authentication
router.use(verifyAuthentication);

// Logout route API
router.get("/logout", asyncHandle(accessController.logout));

module.exports = router;