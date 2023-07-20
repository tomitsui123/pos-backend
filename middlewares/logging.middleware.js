const moment = require('moment')
const Log = require('../models/log.model')

const logToDatabase = async (req, res, next) => {
  try {
    const log = Log({
      remoteAddress: req.socket.remoteAddress,
      method: req.method,
      url: req.url,
      message: req.message,
      body: req.body,
      params: req.params,
      query: req.query,
      createdAt: moment(),
    })
    await log.save()
    console.log('save log')
  } catch (e) {
    console.log(e)
  }
  next()
}
module.exports = {
  logToDatabase
}