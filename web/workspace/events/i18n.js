const url = require('url')
const path = require('path')

// Urls in which this event will not fire
const bypassUrls = []

// Populate these with a datasource
let translations = {}
let primaryLang = 'en'
let supportedLangs = [primaryLang]
let currentLang = 'English'

// Datasources to use, these need adding to the page.json
let langDs = 'langs'
let translationsDs = 'translations'

const Event = function (req, res, data, callback) {
  // Path without trailing slash & default lang
  let toPath = url.parse(req.url, true).path.replace(/\/+$/, '')
  let firstFolder = toPath.replace(/^\/([^\/]*).*$/, '$1')

  // Get languages collection
  if (data.hasResults(langDs)) {
    supportedLangs = data[langDs].results.map(lang => lang.code)
    primaryLang = data[langDs].results.filter(lang => lang.primary)[0].code
    currentLang = data[langDs].results.filter(lang => lang.code === data.params.lang || primaryLang)[0].name
  }

  // Add key-value translations to the page
  if (data.hasResults(translationsDs)) {
    data[translationsDs].results.map(i => translations[i.key] = i.value)
    data.i18n = translations
    delete data[translationsDs]
  }

  // Remove firstFolder
  if (~(supportedLangs.indexOf(firstFolder))) {
    let rmvLang = new RegExp('^\/' + firstFolder, 'gmi')
    toPath = toPath.replace(rmvLang, '')
  }
  
  // Do nothing if default language
  if (!~(supportedLangs.indexOf(firstFolder)) && !~(bypassUrls.indexOf(toPath))) { 
    res.writeHead(302, { Location: '/' + primaryLang + toPath })
    return res.end()
  }

  // Add it to the page data
  data.pathNoLang = toPath
  data.lang = data.params.lang || primaryLang
  data.currentLang = currentLang
    
  // Fin
  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}