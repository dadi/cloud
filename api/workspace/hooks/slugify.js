function slugify (text) {
  return (text || '').toString().toLowerCase()
    .replace(/ç/, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

module.exports = function (obj, type, data) {
  if (obj[data.options.from]) {
    obj[data.options.to] = slugify(obj[data.options.from])
  }
  return obj
}