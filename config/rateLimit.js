const rateLimit = require('express-rate-limit')

const baseRateLimitOptions = {
  windowMs: 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
}

const authRateLimitOptions = {
  ...baseRateLimitOptions,
  limit: 10,
}

const writeRateLimitOptions = {
  ...baseRateLimitOptions,
  limit: 120,
}

module.exports = {
  authRateLimitOptions,
  writeRateLimitOptions,
  authLimiter: rateLimit(authRateLimitOptions),
  writeLimiter: rateLimit(writeRateLimitOptions),
}
