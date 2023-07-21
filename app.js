require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index.route')
const { logToDatabase } = require('./middlewares/logging.middleware')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(logToDatabase)
app.use('/api', indexRouter)
// TODO: add error log

const host = process.env.NODE_ENV === 'production' ? 'shop-mongo' : process.env.MONGODB_HOST
mongoose.connect(
  `mongodb://${host}:${process.env.MONGODB_PORT}/pos`,
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
