require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const winston = require('winston')
const expressWinston = require('express-winston')
const mongoose = require('mongoose')
const cors = require('cors')

const indexRouter = require('./routes/index.route')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)
// TODO: add error log
if (process.env.NODE_ENV === 'development') {
}

if (process.env.NODE_ENV === 'production') {
}

// mongoose.set('useNewUrlParser', true)
// mongoose.set('useUnifiedTopology', true)
mongoose.connect(
  `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/pos`,
  {
    authSource: 'admin',
    user: process.env.MONGODB_ROOT_USERNAME,
    pass: process.env.MONGODB_ROOT_PASSWORD
  }
)
.then((() => console.log('mongo connected')))
.catch(err => console.log(err))
require('./models/index')

module.exports = app
