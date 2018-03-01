const path = require('path')
const url = require('url')

const Event = function (req, res, data, callback) {
  const pathname = url.parse(req.url).pathname
  const parts = url.parse(req.url).pathname.split('/')
  const slug = parts[2]

  const filter = { slug: slug || 'index' }
  callback(null, filter)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
