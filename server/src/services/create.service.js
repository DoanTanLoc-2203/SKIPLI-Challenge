const db = require("./fireStore.service");

// If phoneNumber not exist then create new and generate access code
// else update access code
const createUser = async (payload) => {
  const { id, phoneNumber, accessCode } = payload;
  if (!id || !phoneNumber || !accessCode) return false;
  const usersDb = db.collection("users");
  const userInfo = await usersDb.doc(phoneNumber).get();
  if (userInfo.exists) {
    return await usersDb.doc(phoneNumber).update({ accessCode });
  } else {
    return await usersDb
      .doc(phoneNumber)
      .set({ accessCode, favorite_github_users: [] });
  }
};

module.exports = { createUser };
