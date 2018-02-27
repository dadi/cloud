const dust = require('dustjs-linkedin')
const moment = require('moment')

dust.helpers.dateQuarter = function (chunk, context, bodies, params) {
  var data = context.resolve(params.data)
  var parseFormat = context.resolve(params.parseFormat)
  var date = moment(data, parseFormat || format)

  return chunk.write('Q' + date.quarter() + ' ' + date.format('YYYY'))
}