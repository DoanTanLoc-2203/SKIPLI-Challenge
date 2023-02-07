const express = require("express");
const router = express.Router();
const createController = require("../controllers/create.controller");

router.post("/", createController.createUser);
router.post("/verify", createController.vefiryCode);

module.exports = router;
