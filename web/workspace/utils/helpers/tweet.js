const dust = require('dustjs-linkedin')

const username = /(^|\s)@(\w+)/gmi
const links = /(https?:\/\/[^\s]+)/gmi
const hashtags = /(^|\s)#([\w/]*)/gmi
const newlines = /(\r\n|\r|\n)/gmi
const tco = /(https?:\/\/t.co[^\s]+)/gmi

const url = 'https://twitter.com'

dust.helpers.tweet = function(chunk, context, bodies, params) {
  if (bodies.block) {
    return chunk.capture(bodies.block, context, function(string, chunk) {
      // More basic url handling
      // string = string.replace(links, `<a href="$&" target="_blank">$&</a>`)

      // Resolve urls
      if (params.urls) {
        params.urls.forEach(i => {
          let find = new RegExp(i.url, 'gm')
          string = string.replace(find, `<a href="${i.expanded_url}" target="_blank">${i.display_url}</a>`)
        })
      }

      // Remove remaining t.co urls
      string = string.replace(tco, '')

      // Hashtags
      string = string.replace(hashtags, ` <a href="${url}/hashtag/$2" target="_blank">#$2</a>`)

      // Usernames
      string = string.replace(username, ` <a href="${url}/$2" target="_blank">@$2</a>`)

      // Line breaks
      string = string.replace(newlines, `<br>`)

      chunk.end(string)
    })
  }
  return chunk
}