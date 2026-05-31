function buildCorsOptions(env = process.env) {
  const origin = env.CORS_ORIGIN

  if (!origin) {
    return { origin: false }
  }

  if (origin === '*') {
    return { origin: '*' }
  }

  return {
    origin: origin.split(',').map(value => value.trim()).filter(Boolean),
  }
}

module.exports = {
  buildCorsOptions,
}
