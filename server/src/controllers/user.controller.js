const { formatResponse } = require("../utils/common.util");
const userService = require("../services/user.service");
const githubUserService = require("../services/githubUser.service");

// Get User Profile
async function getUserProfile(req, res) {
  try {
    const { phoneNumber } = req?.query;
    // Check require params
    if (!phoneNumber)
      return res.status(400).json(formatResponse("Missing params phoneNumber"));
    const user = await userService.getUser(phoneNumber); // Get likeGithubUser list
    // Check phoneNumber exist
    if (!user)
      return res
        .status(400)
        .json(formatResponse("Phone number not found!", { success: false }));
    const likedListId = user?.likeGithubUser;
    const listPromise = [];
    // Create promise list to call API get Github User parallel
    if (Array.isArray(likedListId)) {
      likedListId.forEach(async (ele) => {
        listPromise.push(
          new Promise((resolve) => {
            githubUserService.getUser(ele).then((res) => {
              if (res?.data) resolve(res?.data);
              else resolve(null);
            });
          })
        );
      });
    }
    const listObject = await Promise.all(listPromise);
    return res
      .status(200)
      .json(
        formatResponse("Get profile success", { likeGithubUser: listObject })
      );
  } catch (error) {
    return res.status(400).json(formatResponse("Error", { error }));
  }
}

module.exports = { getUserProfile };
