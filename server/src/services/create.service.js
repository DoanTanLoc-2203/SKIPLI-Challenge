const db = require("./fireStore.service");

const createUser = async (payload) => {
  const { id, phone } = payload;
  if (!id || !phone) return false;
  const usersDb = db.collection("users");
  return await usersDb.doc(id).set({ phone, isVerify: false });
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
