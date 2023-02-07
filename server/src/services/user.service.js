const db = require("./fireStore.service");

const getUser = async (phoneNumber) => {
  const user = await db.collection("users").doc(phoneNumber).get();
  return user.data();
};

const removeAccessCode = async (phoneNumber) => {
  const user = await db.collection("users").doc(phoneNumber).update({
    accessCode: "",
  });
  return user;
};

module.exports = { getUser, removeAccessCode };
