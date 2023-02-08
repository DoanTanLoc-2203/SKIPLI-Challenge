const db = require("./fireStore.service");

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
      .set({ accessCode, likeGithubUser: [] });
  }
};

const updateStatusVerify = async (payload) => {
  const { id } = payload;
  if (!id) return false;
  const usersDb = db.collection("users");
  return await usersDb.doc(id).update({
    isVerify: true,
  });
};

module.exports = { createUser, updateStatusVerify };
