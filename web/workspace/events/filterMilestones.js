const path = require('path')
const url = require('url')

const Event = function (req, res, data, callback) {
  let filter = {}

  if (data.params.roadmapCategory) {
    filter = { "category.slug": data.params.roadmapCategory }
  }

  callback(null, filter)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
