// Data taken from the datasource token.json. Powered by cryptocompare.com
const moment = require('moment')

const Event = function (req, res, data, callback) {
  const rawTokenInfo = data.tokenData.results
  console.log(rawTokenInfo)
  delete data.token

  const time = rawTokenInfo.map(i => moment.unix(i.updatedAt).format('H'))
  const priceBTC = rawTokenInfo.map(i => i.priceBTC)
  const priceETH = rawTokenInfo.map(i => i.priceETH)
  const priceUSD = rawTokenInfo.map(i => i.priceUSD)
  const volume24HourBTC = rawTokenInfo.map(i => i.volume24HourBTC)
  const volume24HourETH = rawTokenInfo.map(i => i.volume24HourETH)
  const volume24HourUSD = rawTokenInfo.map(i => i.volume24HourUSD)

  const lastIndex = rawTokenInfo.length - 1

  data.token = {
    TimeFrom: rawTokenInfo[0].updatedAt,
    TimeTo: rawTokenInfo[lastIndex].updatedAt,
    time,
    priceBTC,
    priceETH,
    priceUSD,
    volume24HourBTC,
    volume24HourETH,
    volume24HourUSD,
    priceBTCNow: priceBTC[priceBTC.length - 1],
    priceETHNow: priceETH[priceETH.length - 1],
    priceUSDNow: priceUSD[priceUSD.length - 1],
    marketCapBTC: rawTokenInfo[lastIndex].marketCapBTC,
    marketCapETH: rawTokenInfo[lastIndex].marketCapETH,
    marketCapUSD: rawTokenInfo[lastIndex].marketCapUSD,
    supplyAvailable: rawTokenInfo[lastIndex].supplyAvailable,
    supplyTotal: rawTokenInfo[lastIndex].supplyTotal,
    updatedAt: rawTokenInfo[lastIndex].updatedAt
  }

  console.log(data.token)

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
