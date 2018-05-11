const path = require('path')
const url = require('url')

const Event = function (req, res, data, callback) {
  let filter = {}

  // article.json
  if (data.params.title) {
    filter = { slug: data.params.title }
  }

  // network.json
  if (data.page.key === 'network') {
    filter = { 'sub-category.slug': 'network' }
  }

  // team.json
  if (data.page.key === 'team' && data.params.name) {
    filter = { 'author.slug': data.params.name }
  }

  callback(null, Object.assign({ 'published': true }, filter))
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
