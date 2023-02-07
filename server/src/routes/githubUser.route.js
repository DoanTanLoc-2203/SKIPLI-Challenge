const express = require("express");
const router = express.Router();
const githubUserController = require("../controllers/githubUser.controller");

router.get("/", githubUserController.searchGithubUsers);
router.get("/detail", githubUserController.findGithubUserProfile);

module.exports = router;
