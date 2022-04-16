import inquirer from 'inquirer'
import 'dotenv/config'

export const CREDENTIAL_KEYS = {
  CONSUMER_KEY: 'oauth_consumer_key',
  CONSUMER_SECRET: 'consumer_secret',
  AUTH_TOKEN: 'oauth_token',
  TOKEN_SECRET: 'token_secret',
}

let CREDENTIALS = {
  oauth_consumer_key: '',
  consumer_secret: '',
  oauth_token: '',
  token_secret: '',
}

function validateInput(input) {
  if (input) {
    return true
  } else {
    console.error('invalid input')
    return false
  }
}

async function getApiCredentials() {
  const answers = await inquirer.prompt([
    {
      name: CREDENTIAL_KEYS.CONSUMER_KEY,
      type: 'password',
      mask: true,
      message: 'Enter your api (consumer) key:',
      validate: function (input) {
        return validateInput(input)
      },
    },
    {
      name: CREDENTIAL_KEYS.CONSUMER_SECRET,
      type: 'password',
      mask: true,
      message: 'Enter your api (consumer) key secret:',
      validate: function (input) {
        return validateInput(input)
      },
    },
    {
      name: CREDENTIAL_KEYS.AUTH_TOKEN,
      type: 'password',
      mask: true,
      message: 'Enter your access token:',
      validate: function (input) {
        return validateInput(input)
      },
    },
    {
      name: CREDENTIAL_KEYS.TOKEN_SECRET,
      type: 'password',
      mask: true,
      message: 'Enter your access token secret:',
      validate: function (input) {
        return validateInput(input)
      },
    },
  ])

  CREDENTIALS[CREDENTIAL_KEYS.CONSUMER_KEY] =
    answers[CREDENTIAL_KEYS.CONSUMER_KEY]
  CREDENTIALS[CREDENTIAL_KEYS.CONSUMER_SECRET] = answers.consumer_secret
  CREDENTIALS[CREDENTIAL_KEYS.AUTH_TOKEN] = answers[CREDENTIAL_KEYS.AUTH_TOKEN]
  CREDENTIALS[CREDENTIAL_KEYS.TOKEN_SECRET] =
    answers[CREDENTIAL_KEYS.CONSUMER_SECRET]

  return CREDENTIALS
}

export default getApiCredentials
