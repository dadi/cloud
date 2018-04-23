/**
 * Deletes tokenData records that are older than two days before the
 * record that has been inserted
 */

const Model = require('@dadi/api').Model

module.exports = function (obj, type, data) {
  // return deleteTokenData(obj, data).then(results => {
  return obj
  // }).catch(err => {
  //   return Promise.reject(err)
  // })
}

/**
 * Query for deleting token data
 *
 * @param {object} obj - The token data from the CMC API
 * @param {object} data - The hook data object
 *
 * @returns {Promise} - A an object containing details about deleted records
 */
const deleteTokenData = (obj, data) => {
  // find timestamp for this time yesterday
  let queryDate = new Date(obj.updatedAt * 1000)

  // set the clock back two days
  queryDate.setDate(queryDate.getDate() - 2)

  let query = {
    updatedAt: { '$lt': queryDate.valueOf() }
  }

  return new Promise((resolve, reject) => {
    Model(data.collection).delete(query, (err, result) => {
      if (err) {
        return reject(err)
      }

      return resolve(result)
    })
  })
}
