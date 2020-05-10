// Node Express WS
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { initMongo } from "./utils/connection";
import { authController, travelController, chatroomController } from './controllers';
const app = express();
const expressWs = require('express-ws')(app);
import multer from 'multer';

// Automatic reload
const reloadMagic = require('./reload-magic.js');
reloadMagic(app);

// Utilities
const cookieParser = require('cookie-parser');
const upload = multer({ dest: __dirname + '/uploads/images' });
const config = require("./config.js");

// Database
let dbo = undefined;

// Build
app.use('/', express.static('build'));
app.use('/assets', express.static('src/client/assets'));
app.use(cookieParser());

// NEW STUFF


app.use(bodyParser.json());


// Endpoints

app.use('/auth', upload.none(), authController)

app.use('/travel', upload.none(), travelController)

app.use('/chatroom', upload.none(), chatroomController)


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
