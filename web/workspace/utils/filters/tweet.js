const dust = require('dustjs-linkedin')

const username = /@(\w+)/gmi
const links = /(https?:\/\/[^\s]+)/gmi
const hashtags = /#([\w/]*)/gmi

const url = 'https://twitter.com'

dust.filters.tweet = text => {
  text = text.replace(links, `<a href="$&" target="_blank">$&</a>`)
  text = text.replace(hashtags, `<a href="${url}/hashtag/$1" target="_blank">#$1</a>`)
  text = text.replace(username, `<a href="${url}/$1" target="_blank">$&</a>`)

  return text
}