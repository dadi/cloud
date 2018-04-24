const moment = require('moment')
const groupBy = require('lodash.groupby')

const Event = function (req, res, data, callback) {
  if (!data.hasResults('milestones')) callback()

  // Fist and last date from the datasource
  const startDate = moment(data.milestones.results[0].date)
  const endDate = moment(data.milestones.results[data.milestones.results.length - 1].date)

  // Stop if end if before start
  if (endDate.isBefore(startDate)) callback()

  let d = []
  const month = startDate.clone()

  // Every month between the start and end
  while (month < endDate) {
    d.push(month.valueOf())
    month.add(1, 'month')
  }

  // Group by year
  d = groupBy(d, i => moment(i).format('YYYY'))

  // Give names
  let dates = []
  let i = 0
  for (key in d) {
    dates.push({year: key, months: d[key]})
    i++
  }

  // Object for template
  data.roadmapNav = dates

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
