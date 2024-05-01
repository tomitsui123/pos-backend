var express = require('express')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource hello world')
})

router.post('/verify', async function (req, res, next) {
  if (req.body.password !== process.env.CONTROL_PANEL_PASSWORD) {
    const error = new Error("Wrong password")
    return next(error)
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

router.post('/login', function (req, res, next) {
  logger.info(req.body)
  const { staffId } = req.body
  if (staffId == '11111111') {
    return res.send('login success')
  } else {
    return res.send('login fail')
  }
})

module.exports = router