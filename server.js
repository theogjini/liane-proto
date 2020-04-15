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
const capitalize = require('capitalize');
const config = require("./server/config.json");
const { uniqueNamesGenerator, adjectives, colors } = require("unique-names-generator");
const { monkeys, avatarsPaths } = require("./server/monkeys.js");
const { User, catchAll, Message } = require("./server/utilities.js");

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
        return res.send(JSON.stringify({ success: false, desc: 'Username taken!' }));
      };
      if (user === null) {
        console.log("Signup success");
        dbo.collection("users").insertOne(newUser);
        const sessionId = uuidv1();
        sessions[sessionId] = newUser.infos;
        res.cookie('sid', sessionId);
        console.log('sessions after signup:', sessions);
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

app.get('/get-travels',
  catchAll(async (req, res) => {
    if (!sessions[req.cookies.sid].registered) {
      return res.send(JSON.stringify({ success: false, desc: "Avatar not registered" }))
    };
    const userId = sessions[req.cookies.sid].registered;
    console.log('Get travels called', userId)
    dbo.collection("users").findOne({ _id: ObjectID(userId) }, async (err, user) => {
      if (err) {
        console.log("finding user error:", err);
      };
      if (user === null) {
        console.log("User ID not found:", userId);
        return res.send(JSON.stringify({ success: false, desc: 'User not found :(' }))
      };
      if (user) {
        console.log("User found:", user.travels);
        const mapObjectIds = user.travels.map(travelid => ObjectID(travelid));
        const travels = await dbo.collection("travels").find({ _id: { $in: mapObjectIds } }).toArray();
        return res.send(JSON.stringify({ success: true, desc: "travels well loaded", travels }));
      }
    });
  })
);

app.get('/get-chatrooms',
  catchAll(async (req, res) => {
    if (!sessions[req.cookies.sid].registered) {
      return res.send(JSON.stringify({ success: false, desc: "Avatar not registered" }))
    };
    const userId = sessions[req.cookies.sid].registered;
    console.log('Get chatrooms called', userId)
    dbo.collection("users").findOne({ _id: ObjectID(userId) }, async (err, user) => {
      if (err) {
        console.log("finding user error:", err);
      };
      if (user === null) {
        console.log("User ID not found:", userId);
        return res.send(JSON.stringify({ success: false, desc: 'User not found :(' }))
      };
      if (user) {
        console.log("User found:", user.travels);
        const mapTravelIds = user.travels.map(currTravelId => ObjectID(currTravelId));
        const chatrooms = await dbo.collection("chatrooms").find({ _travelId: { $in: mapTravelIds } }).toArray();
        return res.send(JSON.stringify({ success: true, desc: "travels well loaded", chatrooms }));
      }
    });
  })
);

app.post('/throw', upload.none(),
  catchAll(async (req, res) => {
    const user = sessions[req.cookies.sid];
    const start = req.body.start;
    const end = req.body.end;
    const schedule = JSON.parse(req.body.schedule);
    schedule.forEach(async (dayTravel, idx) => {
      if (dayTravel != null) {
        const newId = new ObjectID();
        const newChatRoomId = new ObjectID();
        console.log('newId', newId);
        const day = dayTravel.goDate ? new Date(dayTravel.goDate).getDay() : idx;
        const travelToAdd = {
          _id: newId,
          _chatroomId: newChatRoomId,
          start,
          end,
          day,
          driver: user.registered,
          seatsAvailable: dayTravel.seatsAvailable,
          attendees: [],
          requests: [],
          goTime: dayTravel.goTime,
          returnTime: dayTravel.returnTime,
          goDate: dayTravel.goDate ? dayTravel.goDate : null
        };
        console.log('travelToAdd: ', travelToAdd);
        await dbo.collection("travels").insertOne(travelToAdd);
        await dbo.collection("chatrooms").insertOne({ _id: newChatRoomId, _travelId: newId, messages: [] });
        await dbo.collection("users").updateOne({ _id: ObjectID(user.registered) }, { $push: { travels: newId } })
      }
    })
    res.send(JSON.stringify({ success: true }))
  })
);

app.post('/find', upload.none(),
  catchAll(async (req, res) => {
    const travels = await dbo.collection('travels').find().toArray();
    const results = await travels.filter(travel => travel.start === req.body.start && travel.end === req.body.end)
    console.log('travels found:', results);
    res.send(JSON.stringify({ success: true, results }));
  })
);

app.post('/select-travel', upload.none(),
  catchAll(async (req, res) => {
    console.log('select hit')
    const travelId = req.body.travel_id;
    const userId = sessions[req.cookies.sid].registered;
    dbo.collection("travels").findOne({ _id: ObjectID(travelId) }, async (err, travel) => {
      if (err) {
        console.log('error', err);
      };
      if (travel === null) {
        console.log('Id Error', travelId);
        return res.send(JSON.stringify({ success: false, desc: 'travel _id not recognized in db' }));
      };
      if (travel) {
        console.log('Travel Found', travel);
        const isRequestAlreadySent = travel.requests.some(id => ObjectID(id).toString() === ObjectID(userId).toString());
        if (isRequestAlreadySent) {
          return res.send(JSON.stringify({ success: false, desc: 'Request already sent!' }))
        };
        await dbo.collection("users").updateOne({ _id: ObjectID(userId) }, { $push: { travels: ObjectID(travelId) } });
        await dbo.collection("travels").updateOne({ _id: ObjectID(travelId) }, { $push: { requests: ObjectID(userId) } });
        res.send(JSON.stringify({ success: true, desc: 'Request sent to the driver!' }))
      };
    })
  })
);

app.post('/get-users-from-requests', upload.none(),
  catchAll(async (req, res) => {
    const userId = sessions[req.cookies.sid].registered;
    console.log('get-users-from-requests called', userId);
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
        console.log('chatroom found', chatroom);
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

// Server
app.all('/*', (req, res, next) => { // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log("Server running on port 4000")
});
