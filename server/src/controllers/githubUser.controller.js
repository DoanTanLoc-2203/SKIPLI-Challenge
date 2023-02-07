const githubUserService = require("../services/githubUser.service");
const { formatResponse } = require("../utils/common.util");

// Search github user using github API
async function searchGithubUsers(req, res) {
  try {
    const { q, per_page, page } = req.query;
    if (!q) return res.status(400).json(formatResponse("Missing params q"));
    const listUser = await githubUserService.search({ q, per_page, page });
    return res.status(200).json(formatResponse("Get success", listUser?.data));
  } catch (error) {
    return res.status(400).json(formatResponse("Error", { error }));
  }
}

// Get User info using id
async function findGithubUserProfile(req, res) {
  try {
    const { github_user_id } = req.query;
    if (!github_user_id)
      return res
        .status(400)
        .json(formatResponse("Missing params github_user_id"));
    const user = await githubUserService.getUser(github_user_id);
    return res.status(200).json(formatResponse("Get success", user?.data));
  } catch (error) {
    return res.status(400).json(formatResponse("Error", { error }));
  }
}

module.exports = {
  searchGithubUsers,
  findGithubUserProfile,
};
