const Event = function (req, res, data, callback) {
  //split text by spaces to define total words
  const totalWords = data.articles.results[0].body.trim().split(/\s+/g).length

  //define words per second based on words per minute
  const wordsPerSecond = 275 / 60

  //define total reading time in seconds
  const totalReadingTimeSeconds = totalWords / wordsPerSecond

  // define reading time
  data.readingTime = Math.floor(totalReadingTimeSeconds / 60)

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}