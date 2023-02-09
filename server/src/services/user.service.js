const db = require("./fireStore.service");

// Get user data from firestore
const getUser = async (phoneNumber) => {
  const user = await db.collection("users").doc(phoneNumber).get();
  return user?.data();
};

// Remove accessCode
const removeAccessCode = async (phoneNumber) => {
  const user = await db.collection("users").doc(phoneNumber).update({
    accessCode: "",
  });
  return user;
};

// Update liked list github user
const updateLikedList = async (phoneNumber, github_user_id) => {
  try {
    const user = await db.collection("users").doc(phoneNumber);
    const userData = await user.get();
    if (!userData?.exists) return false; // Check phoneNumber exist
    const { favorite_github_users } = userData?.data();
    let tempList = [];
    if (Array.isArray(favorite_github_users)) tempList = favorite_github_users;
    // If github_user_id is not exist, push to likeGithubUser list (like)
    if (tempList.indexOf(github_user_id) < 0) tempList.push(github_user_id);
    // else remove from likeGithubUser list (unlike)
    else tempList = tempList.filter((ele) => ele != github_user_id);
    user.update({
      favorite_github_users: tempList,
    });
    return true;
  } catch {
    return false;
  }
};

module.exports = { getUser, removeAccessCode, updateLikedList };
