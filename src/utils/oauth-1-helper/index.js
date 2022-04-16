import * as crypto from 'crypto'
import oauth1a from 'oauth-1.0a'

class OAuth1Helper {
  static getAuthHeaderForRequest(request) {
    const oauth = oauth1a({
      consumer: {
        key: process.env.TWITTER_CONSUMER_KEY,
        secret: process.env.TWITTER_CONSUMER_SECRET,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto
          .createHmac('sha1', key)
          .update(base_string)
          .digest('base64')
      },
    })

    const authorization = oauth.authorize(request, {
      key: process.env.TWITTER_AUTH_TOKEN,
      secret: process.env.TWITTER_TOKEN_SECRET,
    })

    return oauth.toHeader(authorization)
  }
}

export default OAuth1Helper
