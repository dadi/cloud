// Data taken from the datasource token.json. Powered by cryptocompare.com
const moment = require('moment')

const Event = function (req, res, data, callback) {
  const rawTokenInfo = data.tokenData.results.reverse()
  delete data.token

  const time = rawTokenInfo.map(i => moment.unix(i.updatedAt).format('H'))

  const priceBTC = rawTokenInfo.map(i => i.priceBTC)
  const priceETH = rawTokenInfo.map(i => i.priceETH)
  const priceUSD = rawTokenInfo.map(i => i.priceUSD)

  const marketCapETH = rawTokenInfo.map(i => i.marketCapETH)
  const marketCapUSD = rawTokenInfo.map(i => i.marketCapUSD)

  const volume24HourBTC = rawTokenInfo.map(i => i.volume24HourBTC)
  const volume24HourETH = rawTokenInfo.map(i => i.volume24HourETH)
  const volume24HourUSD = rawTokenInfo.map(i => i.volume24HourUSD)

  const volumeTotalBTC = volume24HourBTC.reduce((total, value) => total + parseFloat(value))
  const volumeTotalETH = volume24HourETH.reduce((total, value) => total + parseFloat(value))
  const volumeTotalUSD = volume24HourUSD.reduce((total, value) => total + parseFloat(value))

  const lastIndex = rawTokenInfo.length - 1

  data.token = {
    TimeFrom: rawTokenInfo[0].updatedAt,
    TimeTo: rawTokenInfo[lastIndex].updatedAt,
    time,
    priceBTC,
    priceETH,
    priceUSD,
    volume24HourBTC: rawTokenInfo[lastIndex].volume24HourBTC,
    volume24HourETH: rawTokenInfo[lastIndex].volume24HourBETH,
    volume24HourUSD: rawTokenInfo[lastIndex].volume24HourUSD,
    volumeTotalBTC,
    volumeTotalETH,
    volumeTotalUSD,
    priceBTCNow: priceBTC[priceBTC.length - 1],
    priceETHNow: priceETH[priceETH.length - 1],
    priceUSDNow: priceUSD[priceUSD.length - 1],
    marketCapBTCNow: rawTokenInfo[lastIndex].marketCapBTC,
    marketCapETHNow: rawTokenInfo[lastIndex].marketCapETH,
    marketCapUSDNow: rawTokenInfo[lastIndex].marketCapUSD,
    marketCapUSD,
    marketCapETH,
    supplyAvailable: rawTokenInfo[lastIndex].supplyAvailable,
    supplyTotal: rawTokenInfo[lastIndex].supplyTotal,
    updatedAt: rawTokenInfo[lastIndex].updatedAt
  }

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
