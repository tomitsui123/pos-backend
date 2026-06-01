const http = require('http')
const { startServer } = require('../bin/www')

function deferred() {
  let resolve
  const promise = new Promise(resolvePromise => {
    resolve = resolvePromise
  })
  return { promise, resolve }
}

describe('server startup', () => {
  test('waits for Mongo readiness before listening', async () => {
    const mongoReady = deferred()
    const app = (_req, res) => res.end('ok')
    app.locals = { mongoReady: mongoReady.promise }
    app.set = jest.fn()

    const listenSpy = jest.spyOn(http.Server.prototype, 'listen')
    const startPromise = startServer(app, 0)

    await Promise.resolve()
    expect(listenSpy).not.toHaveBeenCalled()

    mongoReady.resolve()
    const server = await startPromise

    expect(listenSpy).toHaveBeenCalled()
    await new Promise(resolve => server.close(resolve))
    listenSpy.mockRestore()
  })
})
