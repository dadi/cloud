const url = require('url')
const path = require('path')

// Urls in which this event will not fire
const bypassUrls = []

// Populate these with a datasource
let supportedLangs = []
let primaryLang = 'en'
let currentLang = 'English'

const Event = function (req, res, data, callback) {
  // Path without trailing slash & default lang
  let toPath = url.parse(req.url, true).path.replace(/\/+$/, '')
  let firstFolder = toPath.replace(/^\/([^\/]*).*$/, '$1')

  // Add it to the page data
  data.pathNoLang = toPath

  // Get languages collection
  if (data.hasResults('languages') && data.params.lang) {
    supportedLangs = data.languages.results.map(lang => lang.code)
    primaryLang = data.languages.results.filter(lang => lang.primary)[0].code
    currentLang = data.languages.results.filter(lang => lang.code === data.params.lang)[0].name
  }

  // Remove firstFolder
  if (supportedLangs.includes(firstFolder)) {
    let rmvLang = new RegExp('^\/' + firstFolder, 'gmi')
    toPath = toPath.replace(rmvLang, '')
  }

  // Do nothing if default language
  if (!(supportedLangs.includes(firstFolder)) && !(bypassUrls.includes(toPath))) { 
    res.writeHead(302, { Location: '/' + primaryLang + toPath })
    return res.end()
  }

  // Add it to the page data
  data.lang = data.params.lang || primaryLang
  data.currentLang = currentLang
    
  // Fin
  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}