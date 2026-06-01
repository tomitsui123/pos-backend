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
const { buildCorsOptions } = require('./config/cors')
const { buildMongoOptions, buildMongoUri } = require('./config/mongo')

const app = express()

validateEnv()
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        'https://cdn.jsdelivr.net',
        'https://ajax.googleapis.com',
        'https://cdnjs.cloudflare.com',
      ],
      'img-src': ["'self'", 'data:', 'http:', 'https:'],
    },
  },
}))
app.use(cors(buildCorsOptions()))
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

logger.info(`current TZ: ${process.env.TZ}`)
app.locals.mongoReady = Promise.resolve()
if (process.env.NODE_ENV !== 'test') {
  app.locals.mongoReady = mongoose.connect(buildMongoUri(), buildMongoOptions())
    .then((() => logger.info('MongoDB connected')))
    .catch(err => {
      logger.error(err)
      throw err
    })
}
require('./models/index')

module.exports = app
