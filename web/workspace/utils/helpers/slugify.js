const dust = require('dustjs-linkedin')
const slugify = require('slugify')

dust.helpers.slugify = function(chunk, context, bodies, params) {
  if (bodies.block) {
    return chunk.capture(bodies.block, context, function(string, chunk) {
      chunk.end(slugify(string, { lower: true }))
    })
  }
  return chunk
}