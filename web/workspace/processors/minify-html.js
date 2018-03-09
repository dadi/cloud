const minify = require('html-minifier').minify

module.exports = (data, output) => {
  return minify(output, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeComments: false
  })
}