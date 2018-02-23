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
  obj.slug = slugify(obj.name)
  return obj
}