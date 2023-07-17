var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource hello world')
})

router.post('/login', function(req, res, next) {
  console.log(req.body)
  const { staffId } = req.body
  if (staffId == '11111111') {
    return res.send('login success')
  } else {
    return res.send('login fail')
  }
})

module.exports = router