// Modules
const config = require('@dadi/web').Config
const mailgun = require('mailgun-js')(config.get('global.mailgun'))
const reCAPTCHA = require('recaptcha2')
const recaptcha = new reCAPTCHA(config.get('global.recaptcha'))

// Settings to edit
const fromEmail = 'DADI <hello@dadi.cloud>'
const to = 'hello@dadi.cloud'
const subject = '[dadi.cloud] Contact form message'

// Messages
const errRequired = 'All fields are required.'
const errEmail = 'Your email address does not look correct.'
const mgError = 'There was a problem sending the email.'
const mgSuccess = 'Thank you for your message, you will hear back from us soon.'

const Event = function (req, res, data, callback) {
  // On form post
  if (req.method.toLowerCase() !== 'post') return callback()

  // Validate out inputs
  if (
    !req.body['g-recaptcha-response'] && 
    !req.body.name && 
    sanitize(req.body.name) !== '' &&
    !req.body.email &&
    !isEmail(req.body.email) &&
    !req.body.message
  ) {
    data.mailResult = errRequired
    return callback()
  }

  // Construct api call
  const payload = { 
    from: fromEmail,
    to,
    subject,
    text: `
Name: ${sanitize(req.body.name)}
Email: ${req.body.email}
Phone: ${sanitize(req.body.phone)}
Message:

${sanitize(req.body.message)}`
  }

  // Captcha
  recaptcha.validate(req.body['g-recaptcha-response'])
    .then(function () {
      // Validate email
      mailgun.validate(req.body.email, (err, body) => {
        if (body && body.is_valid){
          mailgun.messages().send(payload, (err, body) => {
            if (err) {
              data.mailResult = mgError
            } else {
              data.mailResult = mgSuccess
            }

            return callback()
          })
        } else {
          data.mailResult = errEmail

          return callback()
        }
      })
    })
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
