const path = require('path')
const url = require('url')
const moment = require('moment')

const Event = function (req, res, data, callback) {
  let filter = {}

  // if (data.params.roadmapCategory) {
  //   filter = { 'category.slug': data.params.roadmapCategory }
  // }

  // if (data.page.name === 'roadmap') {
  //   filter = { 'complete': { $ne: true } }
  // }

  // if (data.page.name === 'roadmap' && !data.params.roadmapCategory) {
  //   filter = {
  //     'complete': { $ne: true },
  //     'date': {
  //       $gte: moment().add(-30, 'days').valueOf(),
  //       $lte: moment().add(30, 'days').valueOf()
  //     }
  //   }
  // }

  // if (data.page.name === 'roadmap-milestones' && data.params.status) {
  //   const status = data.params.status === 'complete' ? true : { $ne: true }

  //   filter = {
  //     'complete': status
  //   }
  // }

  callback(null, filter)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
