const path = require('path')
const url = require('url')

const Event = function (req, res, data, callback) {
  //to-do category filtering
  const filter = { slug: data.params.title }
  callback(null, filter)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
