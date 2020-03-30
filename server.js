const config = require("./server/config.json");

const monkeys = require("./server/monkeys.json");

const { uniqueNamesGenerator, adjectives, colors } = require("unique-names-generator");

const express = require('express');
const app = express();
const multer = require('multer');

const sha1 = require('sha1');
const cookieParser = require('cookie-parser');
const uuidv1 = require('uuid/v1');
const reloadMagic = require('./reload-magic.js');
const upload = multer({ dest: __dirname + '/uploads/itemImages' });
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
const capitalize = require('capitalize');

app.use(cookieParser());

let dbo = undefined;
const url = config.url;

let sessions = [];

MongoClient.connect(url, { newUrlParser: true }, (err, client) => {
  dbo = client.db("liane")
});

const avatarsPaths = [
  "/assets/monkeys/chimp.png",
  "/assets/monkeys/lemur.svg",
  "/assets/monkeys/gorilla.png",
  "/assets/monkeys/baboon.svg",
  "/assets/monkeys/chimp2.svg",
  "/assets/monkeys/gorilla2.svg",
  "/assets/monkeys/monk2.svg",
  "/assets/monkeys/monk3.svg",
];


reloadMagic(app);


app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/assets', express.static('assets'));

// Your endpoints go after this line

function catchAll(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
};

app.get('/recall-avatar',
  catchAll(async (req, res) => {
    const sessionId = req.cookies.sid;
    console.log('avatar back:', sessions);
    console.log('sessionId:', sessionId);
    const avatar = sessions[sessionId];
    if (sessions[sessionId]) {
      console.log('success', sessions[sessionId])
      return res.send(JSON.stringify({ success: true, avatar }))
    };
    res.send(JSON.stringify({ success: false }))
  }));

app.post('/pop-avatar', (req, res) => {
  const uniqueMonkeyName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, monkeys.names] });
  const formattedName = capitalize.words(uniqueMonkeyName.split("_").join(" "));
  let uniqueMonkey = {
    name: formattedName,
    original: uniqueMonkeyName,
    path: avatarsPaths[Math.floor(Math.random() * avatarsPaths.length)]
  };
  res.send(JSON.stringify({ success: true, uniqueMonkey }))
});

app.post('/select-avatar', upload.none(),
  catchAll(async (req, res) => {
    const user = JSON.parse(req.body.avatar);
    const sessionId = uuidv1();
    sessions[sessionId] = user;
    res.cookie('sid', sessionId);
    res.send(JSON.stringify({ success: true }))
  }));

app.post('/throw', upload.none(),
  catchAll(async (req, res) => {
    const user = sessions[req.cookies.sid];
    const start = req.body.start;
    const end = req.body.end;
    const travel = JSON.parse(req.body.schedule);
    const travelToAdd = { start, end, travel, user };
    console.log('travelToAdd: ', travelToAdd);
    dbo.collection("travels").insertOne(travelToAdd);
    res.send(JSON.stringify({ success: true }))
  }));

app.post('/find', upload.none(),
  catchAll(async (req, res) => {
    const userSearch = { start: req.body.start, end: req.body.end };
    const travels = await dbo.collection('travels').find().toArray();
    const results = await travels.filter(travel => travel.start === req.body.start && travel.end === req.body.end)
    console.log('travels found:', results);
    res.send(JSON.stringify({ success: true, results }));
  }));

// Your endpoints go before this line

app.all('/*', (req, res, next) => { // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log("Server running on port 4000")
});
