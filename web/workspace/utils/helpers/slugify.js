const dust = require('dustjs-linkedin')

function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/ç/, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

dust.helpers.slugify = function(chunk, context, bodies, params) {
  if (bodies.block) {
    return chunk.capture(bodies.block, context, function(string, chunk) {
      chunk.end(slugify(string))
    })
  }
  return chunk
}