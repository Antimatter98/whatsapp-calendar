const express = require("express");
const router = express.Router();
require("dotenv").config();

const { sendMessageToUser } = require("../controllers/twilioWhatsapp");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

//normal get request
router.get("/sendMessage", async (req, res) => {
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

  //console.log(req);
  if (req.body && req.body.Body && req.body.SmsStatus === "received") {
    //From contains the sender's phone number.
    const { Body, SmsMessageSid, From } = req.body;

    //Check the database for this number first

    //check if the message is in a proper format

    const checkTitle = Body.search("Event Title:");
    const checkBody = Body.search("Event body:");
    const checkStartTime = Body.search("Start time:");
    const checkDuration = Body.search("Duration:");

    console.log(checkTitle, checkBody, checkStartTime, checkDuration);

    console.log(req.body);

    console.log(Body); //message body contains '\n'
    //(only if the message sent by the user is something like:)
    //eg. message:
    // Event title:ha
    // Event body:bsh
    // Start time:bhs
    // Duration: bsns

    //eg. response for message body:
    // Body: 'Event title:ha\nEvent body:bsh\nStart time:bhs\nDuration: bsns',
    // then split the string on '\n' maybe?

    twiml.message("I acknowledge your message.");

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  }
});

router.get("*", (req, res) => {
  res.status(502).send({ status: 502, err: "Bad Request" });
});

module.exports = router;
