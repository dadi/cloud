const minify = require('html-minifier').minify

module.exports = (data, output) => {
  return minify(output, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeComments: true
  })
}