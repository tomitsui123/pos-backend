const winston = require('winston')
require('winston-daily-rotate-file')
const timezoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: process.env.TZ
  })
}

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: timezoned }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: timezoned }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
)
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: consoleFormat
    }),
    new winston.transports.DailyRotateFile({
      format: fileFormat,
      level: 'error',
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      format: fileFormat,
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
})

module.exports = logger