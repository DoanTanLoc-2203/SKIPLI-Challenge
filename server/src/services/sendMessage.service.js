const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const servePhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require("twilio")(accountSid, authToken);

// Sent verify code to client phone number
const sendMessageVerify = async (code, to) => {
  try {
    const message = await client.messages.create({
      body: `Your verify code is: ${code}`,
      from: servePhoneNumber,
      to: to,
    });
    return message;
  } catch {
    return false;
  }
};

module.exports = {
  sendMessageVerify,
};
