var express = require('express')
var router = express.Router()
var SSE = require('express-sse');
var sse = new SSE({
  init: "done"
});

router.get('/stream', sse.init)

router.get('/requestUpdate', (req, res, next) => {
  console.log('send stream')
  sse.send({ fetchData: true })
  return res.send('The retrieve request has been sent.')
})

/* GET home page. */
router.get('/', function(req, res, next) {
  const path = require('path')
  res.sendFile(path.join(__dirname, '../public', 'sse-client-test.html'))
})


module.exports = router
