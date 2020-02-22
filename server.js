const config = require("./config.json")

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

const dbo = undefined
const url = config.url

reloadMagic(app)

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets

// Your endpoints go after this line

app.post('/add-a-travel', upload.none(), (res, send) => {
    res.send(JSON.stringify({ success: true }))
})

// Your endpoints go before this line

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })
