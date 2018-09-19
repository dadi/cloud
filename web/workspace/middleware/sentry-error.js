const config = require('@dadi/web').Config
const Raven = require('raven')

const Middleware = function (app) {
  if (config.get('global.sentry')) {
    Raven.config(`${config.get('global.sentry')}?sentry_environment=${config.get('env')}`).install()

    // Add error handler
    app.use((err, req, res, next) => {
      Raven.captureException(err)
      next(err)
    })

    // Let this error handler run before all others
    app.errors.reverse()
  }
}

module.exports = function (app) {
  return new Middleware(app)
}

module.exports.Middleware = Middleware
