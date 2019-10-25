const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const errorlog = require('express-errorlog')
const fs = require('fs')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')
const recipeRouter = require('./routes/recipe')
const indexRouter = require('./routes/index')

const app = express()
app.use(logger('combined', { stream: accessLogStream }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/users', usersRouter)
app.use('/api/order', ordersRouter)
app.use('/api/recipe', recipeRouter)
app.use('/api', indexRouter)
app.use(errorlog)
// Error handling
app.use((err, req, res, next) => {
  var errorStream = fs.createWriteStream('./error.log', { flags: 'a' })
  errorStream.write(JSON.stringify(err))
  errorStream.write('\n')
  errorStream.on('end', data => {
    errorStream.end()
  })
  res.json(err)
})

mongoose.connect(`mongodb://localhost/POS`)
  .then((() => console.log('mongo connected')))
  .catch(err => console.log(err))
require('./models/categories')
require('./models/category_options')
require('./models/orders')
require('./models/recipe')
require('./models/orders')

module.exports = app
