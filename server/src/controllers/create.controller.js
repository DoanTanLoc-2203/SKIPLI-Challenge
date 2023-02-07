const createUserService = require("../services/create.service");
const userService = require("../services/user.service");
const sendMessageService = require("../services/sendMessage.service");
const uuid = require("uuid");
const { formatResponse, generateCode } = require("../utils/common.util");

// Generate access code and store into database
async function createNewAccessCode(req, res) {
  try {
    const { phoneNumber } = req?.body;
    if (!phoneNumber)
      return res.status(400).json(formatResponse("Missing params phoneNumber"));
    const id = uuid.v4();
    const accessCode = generateCode();
    const response = await createUserService.createUser({
      id,
      phoneNumber,
      accessCode,
    });
    if (response) {
      // await sendMessageService.sendMessageVerify(
      //   accessCode,
      //   phoneNumber,
      // ); /**TODO: */
      return res
        .status(200)
        .json(formatResponse("Send access code success", { accessCode }));
    } else return res.status(400).json(formatResponse("Add fail", null));
  } catch (error) {
    return res.status(400).json(formatResponse("Error", { error }));
  }
}

// Verify using access code and phoneNumber
async function validateAccessCode(req, res) {
  try {
    const { accessCode, phoneNumber } = req?.body;
    if (!phoneNumber || !accessCode)
      return res
        .status(400)
        .json(formatResponse("Missing params phoneNumber or accessCode"));
    const user = await userService.getUser(phoneNumber); // Get accessCode
    if (user) {
      if (accessCode == user?.accessCode) {
        await userService.removeAccessCode(phoneNumber); // Remove access code
        res
          .status(200)
          .json(formatResponse("Verify success", { success: true }));
      } else {
        return res
          .status(400)
          .json(formatResponse("Verify fail", { success: false }));
      }
    } else
      return res
        .status(400)
        .json(formatResponse("Phone number not found!", { success: false }));
  } catch (error) {
    return res.status(400).json(formatResponse("Error", { error }));
  }
}

module.exports = { createNewAccessCode, validateAccessCode };
