const Event = function (req, res, data, callback) {
  // Get article body
  const text = data.articles.results[0].body || ''

  // Split text by spaces to define total words
  const totalWords = text.trim().split(/\s+/g).length

  // Define words per second based on words per minute
  const wordsPerSecond = 275 / 60

  // Define total reading time in seconds
  const readingSeconds = totalWords / wordsPerSecond

  // Add images
  const images = text.match(/!\[/gmi)
  const imagesCount = images ? images.length : 0  
  const imageSeconds = imagesCount * 12

  // define reading time
  const readingTime = Math.round((readingSeconds + imageSeconds) / 60)

  data.readingTime = readingTime === 0 ? '<1' : readingTime

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}