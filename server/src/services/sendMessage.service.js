const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const servePhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require("twilio")(accountSid, authToken);

const sendMessageVerify = async (code, to) => {
  const message = await client.messages.create({
    body: `Your verify code is: ${code}`,
    from: servePhoneNumber,
    to: to,
  });
  return message;
};

module.exports = {
  sendMessageVerify,
};
