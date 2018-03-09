const moment = require('moment')

const Event = function (req, res, data, callback) {
  const filter = {
    updatedAt: {
      // $gt: parseFloat((moment().add(-24, 'hours').valueOf() / 1000).toFixed(0))
      $gt: 1520495567
    }
  }

  callback(null, filter)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
