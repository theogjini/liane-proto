// Node Express WS
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const multer = require('multer');

// Automatic reload
const reloadMagic = require('./reload-magic.js');
reloadMagic(app);

// Utilities
const sha1 = require('sha1');
const cookieParser = require('cookie-parser');
const uuidv1 = require('uuid/v1');
const upload = multer({ dest: __dirname + '/uploads/images' });
const config = require("./config.js");
const { catchAll, Message } = require("./utilities.js");

// Database
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
let dbo = undefined;

let aWss = expressWs.getWss('/'); // Web Socket

// Build
app.use('/', express.static('build'));
app.use('/assets', express.static('src/client/assets'));
app.use(cookieParser());

// NEW STUFF
import path from 'path';
import bodyParser from 'body-parser';
import { initMongo } from "./utils/connection";
import { authController, travelController, chatroomController } from './controllers';


// Add global body parser, it's easier to use globally than multer
app.use(bodyParser.json());

// This makes all routes bound to ` authController` available at /auth
// ex: a route called 'login' in the auth controller, when bound here will resolve at '/auth/login'

app.use('/auth', upload.none(), authController)

app.use('/travel', upload.none(), travelController)

app.use('/chatroom', upload.none(), chatroomController)

// Endpoints

app.post('/get-users-from-requests', upload.none(),
  catchAll(async (req, res) => {
    const userId = sessions[req.cookies.sid].registered;
    console.log('get-users-from-requests called');
    const idsSent = JSON.parse(req.body.requestsId)
    const idsToFind = idsSent.map(id => ObjectID(id));
    const arrayOfUsers = await dbo.collection("users").find({ _id: { $in: idsToFind } }).toArray();
    const infosToSend = await arrayOfUsers.map(user => user.infos);
    console.log('arrayOfUsers', infosToSend);
    res.send(JSON.stringify({ success: true, desc: "Infos well sent", usersRequests: infosToSend }))
  })
);

app.post('/accept-request', upload.none(),
  catchAll(async (req, res) => {
    console.log('accept-traveller hit')
    const travelId = req.body.travelId;
    const travellerId = req.body.travellerId;
    await dbo.collection("travels").updateOne({ _id: ObjectID(travelId) }, { $pull: { requests: ObjectID(travellerId) } });
    await dbo.collection("travels").updateOne({ _id: ObjectID(travelId) }, { $push: { attendees: ObjectID(travellerId) } });
    res.send(JSON.stringify({ success: true, desc: 'Monkey accepted on your Liana!' }));
  })
);

app.post('/reject-request', upload.none(),
  catchAll(async (req, res) => {
    console.log('reject-traveller hit')
    const travelId = req.body.travelId;
    const travellerId = req.body.travellerId;
    await dbo.collection("travels").updateOne({ _id: ObjectID(travelId) }, { $pull: { requests: ObjectID(travellerId) } });
    await dbo.collection("users").updateOne({ _id: ObjectID(travellerId) }, { $pull: { travels: ObjectID(travelId) } });
    res.send(JSON.stringify({ success: true, desc: 'Monkey rejected! :(' }));
  })
);

app.post('/get-messages', upload.none(),
  catchAll(async (req, res) => {
    const chatroomId = req.body.chatroomId;
    console.log('get-messages called');
    await dbo.collection("chatrooms").findOne({ _id: ObjectID(chatroomId) }, (err, chatroom) => {
      if (err) {
        console.log('error finding chatroom:', err);
        res.send(JSON.stringify({ success: false, desc: 'Chatroom not found' }))
      };
      if (chatroom) {
        console.log('chatroom found');
        res.send(JSON.stringify({ success: true, desc: 'Chatroom found!', messages: chatroom.messages }))
      }
    })
  })
);

app.post('/send-message', upload.none(),
  catchAll(async (req, res) => {
    console.log('send-message called');
    const chatroomId = req.body.chatroomId;
    const user = sessions[req.cookies.sid];
    const content = req.body.content;
    const timestamp = req.body.timestamp;
    const messageToAdd = new Message(user, content, timestamp);
    await dbo.collection("chatrooms").updateOne({ _id: ObjectID(chatroomId) }, { $push: { messages: messageToAdd } });
    res.send(JSON.stringify({ success: true }));
  })
);

app.ws('/init', function (ws, req) {
  ws.on('message', (msg) => {
    console.log('message from client is', msg);
    ws.send(JSON.stringify({ success: msg }))
  });
  console.log('This should send something', req.headers);
});

// Server

const template = path.resolve(__dirname + "/../build/index.html");
app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(template);
});

// bind mongo before we start application
initMongo(
  config.url
).then((response) => {
  dbo = response;
  const { PORT = 4000, LOCAL_ADDRESS = "0.0.0.0" } = process.env; // for hiroku
  app.listen(4000, LOCAL_ADDRESS, () => {
    console.log("Server running on port " + PORT);
  });
});
