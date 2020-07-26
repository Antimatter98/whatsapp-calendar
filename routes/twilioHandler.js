const express = require("express");
const router = express.Router();
require("dotenv").config();

const { sendMessageToUser } = require("../controllers/twilioWhatsapp");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

//normal get request
router.get("/sendMessage", async (req, res, next) => {
  try {
    var msg = await sendMessageToUser(
      process.env.PHONE_NUMBER,
      "Hi There! This is a GET request."
    );
    console.log("msg: ", msg);

    res.status(200).send({ msg: msg });
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

//post request, number and message passed as body params
router.post("/sendMessage", async (req, res) => {
  try {
    var userNumber = req.body.userNumber;
    var messageText = req.body.messageText;

    var msg = await sendMessageToUser(userNumber, messageText);

    res.status(200).json({ msg: msg });
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

//receive message from user and reply to a message
//static reply message for now
//here the message parser logic will go...
router.post("/receiveMessage", (req, res) => {
  //message parser logic goes here...

  const twiml = new MessagingResponse();

  twiml.message("I acknowledge your message.");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

router.get("*", (req, res) => {
  res.status(502).send({ status: 502, err: "Bad Request" });
});

module.exports = router;
