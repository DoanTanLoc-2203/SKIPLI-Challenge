const express = require("express");
const router = express.Router();
const createController = require("../controllers/create.controller");

router.post("/", createController.createNewAccessCode);
router.post("/verify", createController.validateAccessCode);

module.exports = router;
