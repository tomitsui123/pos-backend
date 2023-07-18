const jwt = require('jsonwebtoken')
const jwtVerify = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
  jwt.verify(token, process.env.JWT_SECRET)
  next()
}

module.exports = {
  jwtVerify
}