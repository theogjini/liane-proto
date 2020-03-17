const config = require("./server/config.json");

const monkeys = require("./server/monkeys.json");

const {uniqueNamesGenerator, adjectives, colors} = require("unique-names-generator");

const express = require('express');
const app = express();

const sha1 = require('sha1');
const cookieParser = require('cookie-parser');
const uuidv1 = require('uuid/v1');
const reloadMagic = require('./server/reload-magic.js');
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
const capitalize = require('capitalize');

let dbo = undefined;
const url = config.url;

MongoClient.connect(url, {newUrlParser: true}, (err, client) => {
  dbo = client.db("liane")
});

const avatarsPaths = ["/assets/monkeys/chimp.png", "/assets/monkeys/lemur.png", "/assets/monkeys/gorilla.png"];


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
}

app.post('/throw',
  catchAll(async (req, res) => {
    const start = req.body.start;
    const end = req.body.end;
    const travel = {start, end};
    await dbo.collection("travels").insertOne(travel);
    res.send(JSON.stringify({success: true}))
  }));

app.post('/pop-avatar', (req, res) => {
  const uniqueMonkeyName = uniqueNamesGenerator({dictionaries: [adjectives, colors, monkeys.names]});
  const formattedName = capitalize.words(uniqueMonkeyName.split("_").join(" "));
  const uniqueMonkey = {
    name: formattedName,
    original: uniqueMonkeyName,
    path: avatarsPaths[Math.floor(Math.random() * avatarsPaths.length)]
  };
  res.send(JSON.stringify({success: true, uniqueMonkey}))
});

// Your endpoints go before this line

app.all('/*', (req, res, next) => { // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log("Server running on port 4000")
});
