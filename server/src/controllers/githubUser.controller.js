const githubUserService = require("../services/githubUser.service");
const userService = require("../services/user.service");
const { formatResponse } = require("../utils/common.util");

// Search github user using github API
async function searchGithubUsers(req, res) {
  try {
    const { q, per_page, page } = req.query;
    // Check require params
    if (!q) return res.status(400).json(formatResponse("Missing params q"));

    const listUser = await githubUserService.search({ q, per_page, page });

    const likedListId = listUser?.data?.items?.map((ele) => ele?.id);
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
        formatResponse("Get success", { ...listUser?.data, items: listObject })
      );
  } catch (error) {
    return res.status(400).json(formatResponse("Error", { error }));
  }
}

// Get User info using id
async function findGithubUserProfile(req, res) {
  try {
    const { github_user_id } = req.query;
    // Check require params
    if (!github_user_id)
      return res
        .status(400)
        .json(formatResponse("Missing params github_user_id"));
    const user = await githubUserService.getUser(github_user_id);
    if (user)
      return res.status(200).json(formatResponse("Get success", user?.data));
    else return res.status(400).json(formatResponse("Github user not found!"));
  } catch (error) {
    return res.status(400).json(formatResponse("Error", { error }));
  }
}

// Like Github user, toggle like and unlike user
async function likeGithubUser(req, res) {
  try {
    const { phoneNumber, github_user_id } = req.body;
    // Check require params
    if (!phoneNumber || !github_user_id)
      return res
        .status(400)
        .json(formatResponse("Missing params phoneNumber or github_user_id"));
    const user = await githubUserService.getUser(github_user_id);
    // Check github user exist
    if (user?.data?.id != github_user_id)
      return res.status(400).json(formatResponse("Github user not found!"));

    // Update liked list, add or remove github_user_id from likeGithubUser list
    const isSuccess = await userService.updateLikedList(
      phoneNumber,
      github_user_id
    );

    if (isSuccess)
      return res.status(200).json(formatResponse("Success", { success: true }));
    else
      return res.status(400).json(
        formatResponse("Fail or phoneNumber not found!", {
          success: false,
        })
      );
  } catch (error) {
    return res.status(400).json(formatResponse("Error", { error }));
  }
}

module.exports = {
  searchGithubUsers,
  findGithubUserProfile,
  likeGithubUser,
};
