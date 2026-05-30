const jwt = require('jsonwebtoken')

const jwtVerify = (req, res, next) => {
  const authorization = req.headers.authorization || ''
  const [scheme, token] = authorization.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  if (process.env.API_DEVICE_TOKEN && token === process.env.API_DEVICE_TOKEN) {
    return next()
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch (_e) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
}

module.exports = {
  jwtVerify
}
