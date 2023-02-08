const db = require("./fireStore.service");

const getUser = async (phoneNumber) => {
  const user = await db.collection("users").doc(phoneNumber).get();
  return user?.data();
};

const removeAccessCode = async (phoneNumber) => {
  const user = await db.collection("users").doc(phoneNumber).update({
    accessCode: "",
  });
  return user;
};

const updateLikedList = async (phoneNumber, github_user_id) => {
  try {
    const user = await db.collection("users").doc(phoneNumber);
    const userData = await user.get();
    if (!userData?.exists) return false; // Check phoneNumber exist
    const { likeGithubUser } = userData?.data();
    let tempList = [];
    if (Array.isArray(likeGithubUser)) tempList = likeGithubUser;
    // If github_user_id is not exist, push to likeGithubUser list (like)
    if (tempList.indexOf(github_user_id) < 0) tempList.push(github_user_id);
    // else remove from likeGithubUser list (unlike)
    else tempList = tempList.filter((ele) => ele != github_user_id);
    user.update({
      likeGithubUser: tempList,
    });
    return true;
  } catch {
    return false;
  }
};

module.exports = { getUser, removeAccessCode, updateLikedList };
