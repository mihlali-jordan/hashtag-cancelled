import { CREDENTIAL_KEYS } from './get-credentials.js'
import oauthSignature from 'oauth-signature'
import { v4 as uuidv4 } from 'uuid'

function generateOauthSignature({ credentials, base_url, http_method }) {
  const parameters = {
    oauth_consumer_key: credentials[CREDENTIAL_KEYS.CONSUMER_KEY],
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_nonce: uuidv4(),
    oauth_version: '1.0',
    oauth_token: credentials[CREDENTIAL_KEYS.AUTH_TOKEN],
  }

  const encoded_oauth_signature = oauthSignature.generate(
    http_method,
    base_url,
    parameters,
    credentials[CREDENTIAL_KEYS.CONSUMER_SECRET],
    credentials[CREDENTIAL_KEYS.TOKEN_SECRET],
    { encodeSignature: false }
  )

  return `${CREDENTIAL_KEYS.CONSUMER_KEY}="${parameters.oauth_consumer_key}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${parameters.oauth_timestamp}",oauth_nonce="${parameters.oauth_nonce}",oauth_version="1.0",oauth_signature="${encoded_oauth_signature}"`
}

export default generateOauthSignature
