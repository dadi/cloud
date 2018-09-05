const Model = require('@dadi/api').Model

/**
 * Generates a Markdown-formatted path to the referenced image file,
 * storing it in the collection's "path" field.
 */
module.exports = function (obj, type, data) {
  console.log({obj})
  return getUploadedImage(obj.image[0]).then(({metadata, results}) => {
    let image = results[0]
    obj.filename = image.fileName
    obj.path = `![](${image.path})`

    return obj
  })
}

function getUploadedImage (id) {
  return Model('mediaStore').find({
    options: {
      limit: 1
    },
    query: {
      _id: id
    }
  })
}
