const config = require("./config.json")

const monkeys = require("./monkeys.json")

const { uniqueNamesGenerator, adjectives, colors } = require("unique-names-generator")

const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({ dest: __dirname + '/uploads/itemImages' })
const sha1 = require('sha1')
const cookieParser = require('cookie-parser')
const uuidv1 = require('uuid/v1')
const reloadMagic = require('./reload-magic.js')
const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID
const capitalize = require('capitalize')

let dbo = undefined
const url = config.url

MongoClient.connect(url, { newUrlParser: true }, (err, client) => {
    dbo = client.db("liane")
})

const avatarsPaths = ["uploads/monkeys/chimp.png", "uploads/monkeys/lemur.png", "/uploads/monkeys/gorilla.png"]



reloadMagic(app)

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/uploads', express.static('uploads')); // Needed for local assets

// Your endpoints go after this line

app.post('/throw', upload.none(), (req, res) => {
    const start = req.body.start
    const end = req.body.end
    const travel = { start, end }
    dbo.collection("travels").insertOne(travel)
    res.send(JSON.stringify({ success: true }))
})

app.post('/pop-avatar', upload.none(), (req, res) => {
    const uniqueMonkeyName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, monkeys.names] })
    const formattedName = capitalize.words(uniqueMonkeyName.split("_").join(" "))
    const uniqueMonkey = { name: formattedName, original: uniqueMonkeyName, path: avatarsPaths[Math.floor(Math.random() * avatarsPaths.length)] }
    res.send(JSON.stringify({ success: true, uniqueMonkey }))
})

// Your endpoints go before this line

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })
