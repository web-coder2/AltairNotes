const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors');
const axios = require('axios')
const dayjs = require('dayjs')
const dotenv = require('dotenv')
const mongoose = require('mongoose');


const PORT = 3000
const app = express()
dotenv.config();


const MONGO_URL = process.env.DATABASE_URL
const MONGO_USER = process.env.DATABASE_USERNAME
const MONGO_PASS = process.env.DATABASE_PASSWORD
const MONGO_PORT = process.env.DATABASE_PORT
const DATABASE_NAME = process.env.DATABASE_NAME


const NoteRoute = require('./routes/note.js')

app.use(cors({ origin: '*' }))
app.use(express.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(NoteRoute)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

async function startConnectToDB() {
    try {
        const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:${MONGO_PORT}/${DATABASE_NAME}?authSource=admin`;
        await mongoose.connect(uri);
    } catch (err) {
        console.log(err);
    }
}

app.listen(PORT, () => {
    startConnectToDB()
    console.log('server listening on', PORT)
})