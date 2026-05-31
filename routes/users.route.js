var express = require('express')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')
const httpError = require('../utils/httpError')
var router = express.Router()

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
})

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource hello world')
})

router.post('/verify', authLimiter, async function (req, res, next) {
  if (req.body.password !== process.env.CONTROL_PANEL_PASSWORD) {
    return next(httpError(401, 'Unauthorized'))
  }
  let token
  try {
    token = jwt.sign(
      {
        sign: 'sign'
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )
  } catch (err) {
    console.log(err)
    const error = new Error("Error! Something went wrong.")
    return next(error)
  }

  res
    .status(200)
    .json({
      success: true,
      data: { token },
    })
})

module.exports = router
