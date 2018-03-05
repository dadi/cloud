const path = require('path')
const url = require('url')
const moment = require('moment')

const Event = function (req, res, data, callback) {
  let filter = {}

  if (data.params.roadmapCategory) {
    filter = { "category.slug": data.params.roadmapCategory }
  }

  if (data.title === 'roadmap') {
    filter = { "complete": { $ne: true } }
  }

  if (data.title === 'roadmap' && !data.params.roadmapCategory) {
  	filter = { 
  	  "complete": { $ne: true },
  	  "date": { $gte: moment().add(-30, 'days') }, { $lte: moment().add(30, 'days') }
  	}
  }

  callback(null, filter)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
