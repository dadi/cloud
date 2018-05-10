const express = require('express')
const app = express()
const MBTiles = require('@mapbox/mbtiles')

// if (process.argv.length < 3) {
//   console.log('Error! Missing TILES filename.\nUsage: node server.js TILES [PORT] [HOST]')
//   process.exit(1)
// }

let host = '0.0.0.0'
let port = 3004

// if (process.argv.length === 4) {
//   port = parseInt(process.argv[3])
// }

// if (process.argv.length === 5) {
//   host = parseInt(process.argv[4])
// }

var mbtilesLocation = './data/dadi_2cb479.mbtiles' // String(process.argv[2]).replace(/\.mbtiles/, '') + '.mbtiles'

new MBTiles(mbtilesLocation, (err, mbtiles) => {
  if (err) throw err

  app.get('/:z/:x/:y.*', function (req, res) {
    let extension = req.params[0]

    switch (extension) {
      case 'png': {
        mbtiles.getTile(req.params['z'], req.params['x'], req.params['y'], (err, tile, headers) => {
          if (err) {
            res.status(404).send('Tile rendering error: ' + err + '\n')
          } else {
            res.header('Content-Type', 'image/png')
            res.send(tile)
          }
        })
        break
      }
      case 'grid.json': {
        mbtiles.getGrid(req.params['z'], req.params['x'], req.params['y'], (err, grid, headers) => {
          if (err) {
            res.status(404).send('Grid rendering error: ' + err + '\n')
          } else {
            res.header('Content-Type', 'text/json')
            res.send(grid)
          }
        })
        break
      }
    }
  })
})

// actually create the server
app.listen(port, host)
