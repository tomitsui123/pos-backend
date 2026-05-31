const {
  authRateLimitOptions,
  writeRateLimitOptions,
} = require('../config/rateLimit')

describe('rate limit configuration', () => {
  test('auth endpoints use a stricter limit', () => {
    expect(authRateLimitOptions).toEqual(expect.objectContaining({
      windowMs: 60 * 1000,
      limit: 10,
      standardHeaders: true,
      legacyHeaders: false,
    }))
  })

  test('write endpoints are rate limited separately', () => {
    expect(writeRateLimitOptions).toEqual(expect.objectContaining({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
    }))
  })
})
