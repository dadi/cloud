// h/t https://medium.com/@andy.neale/securing-node-web-applications-5d5f9bc21926

const Middleware = function (app) {
  app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'deny')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('X-Content-Type-Options', 'nosniff')

    if (req.secure) {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    }

    next()
  })
}

module.exports = function (app) {
  return new Middleware(app)
}

module.exports.Middleware = Middleware
