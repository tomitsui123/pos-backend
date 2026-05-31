require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressWinston = require('express-winston')
const winston = require('winston')
const helmet = require('helmet')
const cors = require('cors')

const indexRouter = require('./routes/index.route')

const logger = require('./utils/logger')
const { validateEnv } = require('./config/env')

const app = express()

validateEnv()
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : false
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(expressWinston.logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/pos-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  msg: 'HTTP {{req.method}} {{req.url}}',
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', indexRouter)
// TODO: add error log

const host = process.env.MONGODB_HOST
logger.info(`current TZ: ${process.env.TZ}`)
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    `mongodb://${host}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`,
    {
      authSource: 'admin',
      user: process.env.MONGODB_ROOT_USERNAME,
      pass: process.env.MONGODB_ROOT_PASSWORD
    }
  )

    .then((() => logger.info('MongoDB connected')))
    .catch(err => logger.error(err))
}
require('./models/index')

module.exports = app
