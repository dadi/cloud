const url = require('url')
const path = require('path')

// Set the primary language
const primaryLang = 'en'

// Set what we support
const supportedLangs = [primaryLang, 'pt']
const bypassUrls = []

const Event = function (req, res, data, callback) {
  // Path without trailing slash & default lang
  let toPath = url.parse(req.url, true).path.replace(/\/+$/, '')
  const firstFolder = toPath.replace(/^\/([^\/]*).*$/, '$1')

  // Remove firstFolder
  if (~(supportedLangs.indexOf(firstFolder))) {
    var rmvLang = new RegExp('^\/' + firstFolder, 'gmi')
    toPath = toPath.replace(rmvLang, '')
  }

  data.pathNoLang = toPath

  // Do nothing if default language
  if (!~(supportedLangs.indexOf(firstFolder)) && !~(bypassUrls.indexOf(toPath))) { 
    res.writeHead(302, { Location: '/' + primaryLang + toPath })
    return res.end()
  }

  data.lang = data.params.lang || primaryLang
  
  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}