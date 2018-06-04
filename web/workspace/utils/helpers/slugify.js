const dust = require('dustjs-linkedin')
const slugify = require('slugify')
slugify.extend({':': ' '})

dust.helpers.slugify = function(chunk, context, bodies, params) {
  if (bodies.block) {
    return chunk.capture(bodies.block, context, function(string, chunk) {
      chunk.end(slugify(string.replace(/amp;/, ''), { lower: true }))
    })
  }
  return chunk
}