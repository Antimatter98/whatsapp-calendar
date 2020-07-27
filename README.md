# whatsapp-calendar

Entry point: index.js
*.env needed locally for credentials*

## Important Links (Read first)

#### Twilio Node environment setup: 
[Twilio Node Setup] (https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment)

#### Twilio Whatsapp API:
[Link] (https://www.twilio.com/docs/whatsapp/quickstart/node)

#### ngrok for webhooks locally
[Setup ngrok] (https://ngrok.com/)

## Routes:

#### Sending messages
Files: [/routes/twilioHandler] and [/controllers/twilioWhatsapp]

```[GET]: http://localhost:PORT/twilioAPI/sendMessage```

```[POST]: http://localhost:PORT/twilioAPI/sendMessage```


#### Receiving messages (and replying)
Files: [/routes/twilioHandler]

```[POST]: http://localhost:PORT/twilioAPI/receiveMessage```
