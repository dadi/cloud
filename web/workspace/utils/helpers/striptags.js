const dust = require('dustjs-linkedin')
const striptags = require('striptags')

/*
* Returns the supplied 'data' parameter formatted using the supplied 'format' parameter
* Pass a unix epoch time (expects milliseconds) in the 'unix' parameter. For seconds use 'unix_sec'
* Usage: {@formatDate data="{body}" [unix="{lastModifiedAt}"] format="YYYY-MM-DDTh:mm:ss+01:00"/}
*/
dust.helpers.striptags = function (chunk, context, bodies, params) {
  if (bodies.block) {
    return chunk.capture(bodies.block, context, function(string, chunk) {
      chunk.end(striptags(string))
    })
  }

  return chunk
}
