const fs = require("firebase-admin");
const { fireBaseConfig } = require("../configs/firebase.config");

// Init firebase
fs.initializeApp({
  credential: fs.credential.cert(fireBaseConfig),
});
const db = fs.firestore();

module.exports = db;
