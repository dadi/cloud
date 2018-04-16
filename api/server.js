const server = require('@dadi/api')
const config = require('@dadi/api').Config
const log = require('@dadi/api').Log

server.run(() => {
  log.get().info('DADI API: Started')
})

// add documentation route
require('@dadi/apidoc').init(server, config)
