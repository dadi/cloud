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
  obj[data.options.to] = slugify(obj[data.options.from])
  return obj
}