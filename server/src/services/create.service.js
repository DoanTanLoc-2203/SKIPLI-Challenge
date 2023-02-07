const db = require("./fireStore.service");

const createUser = async (payload) => {
  const { id, phoneNumber, accessCode } = payload;
  if (!id || !phoneNumber || !accessCode) return false;
  const usersDb = db.collection("users");
  return await usersDb.doc(phoneNumber).set({ accessCode });
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
