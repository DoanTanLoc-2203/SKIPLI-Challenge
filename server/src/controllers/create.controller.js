const createUserService = require("../services/create.service");
const sendMessageService = require("../services/sendMessage.service");
const uuid = require("uuid");
const { formatResponse, generateCode } = require("../utils/common.util");

async function createUser(req, res) {
  try {
    const { phone } = req?.body;
    const id = uuid.v4();
    const response = await createUserService.createUser({ id, phone });
    if (response) {
      const code = generateCode();
      req.session.user = { id, code }; // Save code in session in order to verify in the next step
      // await sendMessageService.sendMessageVerify(code, phone); /**TODO: */
      return res.status(200).json(formatResponse("Success", { code }));
    } else return res.status(400).json(formatResponse("Add fail", null));
  } catch (error) {
    return res.status(400).json(formatResponse("Error", { error }));
  }
}

async function vefiryCode(req, res) {
  try {
    const { code } = req?.body;
    const { code: storedCode, id } = req.session?.user; // Get code in session to verify
    if (code == storedCode) {
      req.session.destroy();
      const response = await createUserService.updateStatusVerify({ id });
      if (response)
        return res.status(200).json(formatResponse("Verify success"));
      else return res.status(400).json(formatResponse("Update status fail"));
    } else return res.status(400).json(formatResponse("Verify fail"));
  } catch (error) {
    return res.status(400).json(formatResponse("Error", { error }));
  }
}

module.exports = { createUser, vefiryCode };
