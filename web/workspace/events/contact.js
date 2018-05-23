// You need a Mailgun API key for this to work
// For this script to work DADI Web should be started with an ENV variable for the Mailgun API key
const mailgun = require('mailgun-js')({
  apiKey: process.env['MAILGUN_API'], 
  domain: 'mg.dadi.cloud'
})

const Event = function (req, res, data, callback) {
  // On form post
  if (req.method.toLowerCase() === 'post') {

    // Validate out inputs
    if (!req.body.email && !isEmail(req.body.email) && !req.body.message) {
      data.mailResult = 'All fields are required.'
      return callback()
    }

    mailgun.messages().send({
      from: 'DADI <hello@dadi.cloud>',
      to: 'hello@dadi.cloud',
      subject: '[dadi.cloud] Contact form message',
      text: `
Name: ${sanitize(req.body.name)}
Email: ${req.body.email}
Phone: ${sanitize(req.body.phone)}
Message:

${sanitize(req.body.message)}`
    }, (err, body) => {
      if (err) {
        data.mailResult = 'There was a problem sending the email.'
      } else {
        data.mailResult = 'Thank you for your message, you will hear back from us soon.'
      }

      return callback()
    })

  } else {
    return callback()
  }
}

// Taken from: http://stackoverflow.com/a/46181/306059
function isEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

function sanitize (value) {
  return value.replace(/<(?:.|\n)*?>/gm, '').replace(/\/$/gm, '')
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
