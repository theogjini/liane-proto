// Node
const express = require('express');
const app = express();
const multer = require('multer');

// Automatic reload
const reloadMagic = require('./reload-magic.js');
reloadMagic(app);

// Utilities
const sha1 = require('sha1');
const cookieParser = require('cookie-parser');
const uuidv1 = require('uuid/v1');
const upload = multer({ dest: __dirname + '/uploads/itemImages' });
const capitalize = require('capitalize'); const config = require("./server/config.json");
const { uniqueNamesGenerator, adjectives, colors } = require("unique-names-generator");
const { monkeys, avatarsPaths } = require("./server/monkeys.js");
const { User, catchAll } = require("./server/utilities.js");

// Database
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
const url = config.url;
let dbo = undefined;
MongoClient.connect(url, { newUrlParser: true }, (err, client) => {
  dbo = client.db("liane")
});
let sessions = []; // Cookies

// Build
app.use('/', express.static('build'));
app.use('/assets', express.static('assets'));
app.use(cookieParser());


// Endpoints
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
  })
);

app.post('/login', upload.none(),
  catchAll(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    dbo.collection("users").findOne({ username }, (err, user) => {
      if (err) {
        console.log('Error login', err);
        return res.send(JSON.stringify({ success: false }));
      };
      if (user === null) {
        console.log("Invalid username");
        return res.send(JSON.stringify({ success: false, desc: "Invalid username!" }));
      };
      if (user.password != sha1(password)) {
        console.log("Invalid password");
        return res.send(JSON.stringify({ success: false, desc: "Invalid password!" }));
      };
      if (user.password === sha1(password)) {
        console.log("Login Success");
        const sessionId = uuidv1();
        sessions[sessionId] = user.infos;
        res.cookie('sid', sessionId);
        return res.send(JSON.stringify({ success: true, desc: "Welcome back!", avatar: user.infos }));
      };
    })
  })
);

app.post('/signup', upload.none(),
  catchAll(async (req, res) => {
    console.log('sign-up hit!')
    const username = req.body.username;
    const password = sha1(req.body.password);
    const user = JSON.parse(req.body.avatar)
    const id = new ObjectID();
    const newUser = new User(username, password, user, id);
    dbo.collection("users").findOne({ username }, (err, user) => {
      if (err) {
        console.log('Error login', err);
        return res.send(JSON.stringify({ success: false }));
      };
      if (user) {
        console.log("Username taken!");
        return res.send(JSON.stringify({ success: false, desc: "Username taken!" }));
      };
      if (user === null) {
        console.log("Signup success");
        dbo.collection("users").insertOne(newUser);
        const sessionId = uuidv1();
        sessions[sessionId] = newUser;
        res.cookie('sid', sessionId);
        return res.send(JSON.stringify({ success: true, desc: 'Thrilled to have you here!', avatar: newUser.infos }));
      };
    })
  })
);

app.post('/pop-avatar',
  catchAll((req, res) => {
    const uniqueMonkeyName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, monkeys.names] });
    const formattedName = capitalize.words(uniqueMonkeyName.split("_").join(" "));
    let uniqueMonkey = {
      name: formattedName,
      original: uniqueMonkeyName,
      path: avatarsPaths[Math.floor(Math.random() * avatarsPaths.length)]
    };
    res.send(JSON.stringify({ success: true, avatar: uniqueMonkey }))
  })
);

app.post('/select-avatar', upload.none(),
  catchAll(async (req, res) => {
    const user = JSON.parse(req.body.avatar);
    const sessionId = uuidv1();
    sessions[sessionId] = user;
    res.cookie('sid', sessionId);
    res.send(JSON.stringify({ success: true }))
  })
);

app.post('/throw', upload.none(),
  catchAll(async (req, res) => {
    const user = sessions[req.cookies.sid];
    const start = req.body.start;
    const end = req.body.end;
    const schedule = JSON.parse(req.body.schedule);
    schedule.forEach((dayTravel, idx) => {
      if (dayTravel != null) {
        const newId = new ObjectID();
        const newChatRoomId = new ObjectID();
        console.log('newId', newId);
        const travelToAdd = {
          _id: newId,
          _chatroomId: newChatRoomId,
          start,
          end,
          day: idx,
          driver: user,
          seatsAvailable: dayTravel.seatsAvailable,
          attendees: [],
          requests: [],
          goTime: dayTravel.goTime,
          returnTime: dayTravel.returnTime,
          goDate: dayTravel.goDate ? dayTravel.goDate : null
        };
        console.log('travelToAdd: ', travelToAdd);
        dbo.collection("travels").insertOne(travelToAdd);
        dbo.collection("chatrooms").insertOne({ _id: newChatRoomId });
      }
    })
    res.send(JSON.stringify({ success: true }))
  })
);

app.post('/find', upload.none(),
  catchAll(async (req, res) => {
    const userSearch = { start: req.body.start, end: req.body.end };
    const travels = await dbo.collection('travels').find().toArray();
    const results = await travels.filter(travel => travel.start === req.body.start && travel.end === req.body.end)
    console.log('travels found:', results);
    res.send(JSON.stringify({ success: true, results }));
  })
);


// Server
app.all('/*', (req, res, next) => { // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log("Server running on port 4000")
});
