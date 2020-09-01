const express = require("express");
const app = express();

require("dotenv").config();

const twilioHandler = require("./routes/twilioHandler");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  console.log("Hello");
});

//twilio api to send and receive messages, calls 'routes/twilioHandler'
app.use("/twilioAPI", twilioHandler);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
