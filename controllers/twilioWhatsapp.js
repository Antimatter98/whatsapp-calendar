require("dotenv").config();

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const sendMessageToUser = async (userNumber, messageText) => {
  try {
    var message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_NUMBER}`,
      body: messageText,
      to: `whatsapp:${userNumber}`,
    });

    return message.sid;
  } catch (err) {
    return err;
  }
};

module.exports = {
  sendMessageToUser,
};
