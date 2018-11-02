/**
 * Filter out the current article from the related articles datasource
 */
const Event = function (req, res, data, callback) {
  if (data.hasResults('articles') && data.hasResults('category-articles')) {
    let currentArticle = data.articles.results[0]

    // Filter out the current article.
    data['category-articles'].results = data['category-articles'].results.map(article => {
      if (article._id !== currentArticle._id) {
        return article
      }
    }).filter(Boolean)
  }

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
