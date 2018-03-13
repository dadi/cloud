/**
 * Reject an insert of token data fetched from the CoinMarketCap API,
 * if a result can be found for the updatedAt property
 */

const Model = require('@dadi/api').Model

module.exports = function (obj, type, data) {
  return checkTokenData(obj, data).then(tokenData => {
    if (tokenData) {
      let error = new Error('Token data already exists for this time period: ' + obj.updatedAt)
      error.details = obj

      return Promise.reject(error)
    }

    return obj
  })
}

/**
 * Query for existing token data
 *
 * @param {object} obj - The token data from the CMC API
 * @param {object} data - The hook data object
 *
 * @returns {Promise} - A tokenData object if found, otherwise null
 */
const checkTokenData = (obj, data) => {
  let query = {
    updatedAt: obj.updatedAt
  }

  return new Promise((resolve, reject) => {
    Model(data.collection).find(query, { limit: 1 }, (err, tokenData) => {
      if (tokenData.results.length === 0) {
        return resolve(null)
      }

      return resolve(tokenData.results[0])
    })
  })
}
