const marked = require('marked')

const Event = function (req, res, data, callback) {
  const meta = {}
  meta.image = `${req.protocol}://${data.host}/assets/products/dadi-og.jpg`

  // -------------------------
  // Root pages
  if (data.hasResults('pages')) {
    const page = data.pages.results[0]

    meta.title = page.metaTitle ? page.metaTitle : page.title
    meta.description = page.metaDescription ? page.metaDescription : page.excerpt
  }

  // -------------------------
  // Articles
  if (data.hasResults('articles') && data.page.key === 'article') {
    const article = data.articles.results[0]

    meta.title = article.metaTitle ? article.metaTitle : article.title
    meta.description = article.metaDescription ? article.metaDescription : article.excerpt
    
    // get first image
    if (article.body) {
      const images = article.body.match(/!\[[^\]]+\]\([^)]+\)/)

      if (images && images[0]) {
        let image = marked(images[0])
        image = image.match(/src="(.+?)"/)[1]

        // Is it a local image?
        if (!image.startsWith('http')) {
          image = `${req.protocol}://${data.host}${image}`
        }

        // Put in object
        meta.image = image
      }
    }
  }

  // -------------------------  
  // Web services
  if (data.hasResults('web-service') && data.page.key === 'web-services') {
    const app = data['web-service'].results[0]

    meta.title = `DADI ${app.name}`
    meta.description = app.overview
    meta.image = `${req.protocol}://${data.host}/assets/products/dadi-${app.slug}-og.jpg`
  }

  // Put in page
  data.page.meta = meta

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}