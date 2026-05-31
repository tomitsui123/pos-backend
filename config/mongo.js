function buildMongoUri(env = process.env) {
  return `mongodb://${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_DB}`
}

function buildMongoOptions(env = process.env) {
  return {
    authSource: 'admin',
    user: env.MONGODB_ROOT_USERNAME,
    pass: env.MONGODB_ROOT_PASSWORD,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 20,
    minPoolSize: 2,
  }
}

module.exports = {
  buildMongoUri,
  buildMongoOptions,
}
