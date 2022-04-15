const OAuth = require('oauth')
const readline = require('readline')
const open = require('open')
require('dotenv').config()

// Create OAuth object
const authConsumer = new OAuth.OAuth(
  process.env.TWITTER_REQUEST_TOKEN_URL,
  process.env.TWITTER_ACCESS_TOKEN_URL,
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  '1.0A',
  'oob',
  'HMAC-SHA1'
)

// Will help us read in the user's pin input in the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const getAuthRequestToken = async () => {
  return new Promise((resolve, reject) => {
    authConsumer.getOAuthRequestToken(
      async (error, oauthToken, oauthTokenSecret, results) => {
        if (error) {
          reject(error)
        } else {
          await open(
            `${process.env.TWITTER_AUTHORIZE_URL}?oauth_token=${oauthToken}`
          )
          resolve({
            oauthToken,
            oauthTokenSecret,
          })
        }
      }
    )
  })
}

const getUserPin = async () => {
  return new Promise((resolve) => {
    rl.question('Enter your pin...\n', (pin) => {
      console.log(`You entered ${pin}`)
      resolve(pin)
    })
  })
}

const getAuthAccessToken = async (oauthToken, oauthTokenSecret, pin) => {
  return new Promise((resolve, reject) => {
    authConsumer.getOAuthAccessToken(
      oauthToken,
      oauthTokenSecret,
      pin,
      (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
        if (error) {
          reject(error)
        } else {
          console.log('Successfully authorised with twitter')
          resolve({
            oauthAccessToken,
            oauthAccessTokenSecret,
          })
        }
      }
    )
  })
}
