const encoding = 'utf8'
const http = require('http')
const https = require('https')
const promiseQueue = require('js-promise-queue')
const SECURE_PROTOCOL = 'https:'

const webConfigPath = `../web/config/config.${process.env['NODE_ENV']}.json`
const webConfig = require(webConfigPath)

const symbols = [
  'BTC',
  'ETH'
]

const apiCredentials = {
  clientId: webConfig.api.main.auth.clientId,
  secret: webConfig.api.main.auth.secret
}

let apiOptions = {
  hostname: webConfig.api.main.host,
  port: webConfig.api.main.port,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

let data = {}

return promiseQueue(symbols, symbol => {
  return tokenDataRequest(symbol)
}, { interval: 2000 }).then(results => {
  results.forEach(result => {
    data = Object.assign(data, result)
  })

  apiOptions.path = '/token'

  return sendRequest(apiOptions, apiCredentials).then(tokenResponse => {
    apiOptions.path = '/1.0/cloud/tokenData'
    apiOptions.headers['Authorization'] = 'Bearer ' + tokenResponse.accessToken

    // prepare data for API insert
    const apiPostData = prepareInsert(data)

    return sendRequest(apiOptions, apiPostData).then(response => {
      console.log(response)
    })
  })
})

function prepareInsert (data) {
  return {
    priceBTC: parseFloat(data['price_btc'], 8),
    priceETH: parseFloat(data['price_eth'], 8),
    priceUSD: parseFloat(data['price_usd'], 8),
    marketCapBTC: parseFloat(data['market_cap_btc'], 8),
    marketCapETH: parseFloat(data['market_cap_eth'], 8),
    marketCapUSD: parseFloat(data['market_cap_usd'], 8),
    volume24HourBTC: parseFloat(data['24h_volume_btc'], 8),
    volume24HourETH: parseFloat(data['24h_volume_eth'], 8),
    volume24HourUSD: parseFloat(data['24h_volume_usd'], 8),
    supplyAvailable: parseFloat(data['available_supply'], 8),
    supplyTotal: parseFloat(data['total_supply'], 8),
    updatedAt: Number(data['last_updated'])
  }
}

/**
 * description
 *
 * @param {param type} name - description
 */
function tokenDataRequest (convertSymbol) {
  return new Promise((resolve, reject) => {
    const options = {
      protocol: 'https:',
      hostname: 'api.coinmarketcap.com',
      path: '/v1/ticker/dadi/?convert=' + convertSymbol,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    sendRequest(options).then(response => {
      return resolve(response[0])
    })
  })
}

/**
 * description
 *
 * @param {param type} name - description
 */
function sendRequest (options, data) {
  return new Promise((resolve, reject) => {
    const requestHandler = options.protocol === SECURE_PROTOCOL ? https : http 
    
    const request = requestHandler.request(options, res => {
      let buffers = []
      let response = ''

      res.on('data', chunk => {
        addData(chunk, buffers, response)
      }).on('end', () => {
        response = concatBuffers(buffers, response)
        return resolve(JSON.parse(response))
      })
    }).on('error', error => {
      return reject(error)
    })

    if (options.method.toLowerCase() === 'post' && data) {
      request.write(JSON.stringify(data))
    }

    request.end()
  })
}

function addData (chunk, buffers, response) {
  Buffer.isBuffer(chunk) ? buffers.push(chunk) : response += chunk
}

function concatBuffers (buffers, responseString) {
   return buffers.length > 0 ? Buffer.concat(buffers).toString(encoding) : responseString
}
