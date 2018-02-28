const Event = function (req, res, data, callback) {
  // Get article body
  const text = data.articles.results[0].body

  //split text by spaces to define total words
  const totalWords = text.trim().split(/\s+/g).length

  //define words per second based on words per minute
  const wordsPerSecond = 275 / 60

  //define total reading time in seconds
  const totalReadingTimeSeconds = totalWords / wordsPerSecond

  // Add images
  const images = text.match(/!\[/gmi)
  const imagesCount = images ? images.length : 0  
  const imageSeconds = imagesCount * 12

  console.log('####################################')
  console.log(imageSeconds)

  // define reading time
  data.readingTime = Math.round((totalReadingTimeSeconds + imageSeconds) / 60)

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}