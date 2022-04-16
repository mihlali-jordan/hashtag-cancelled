import axios from 'axios'
import 'dotenv/config'

import { OAuth1Helper } from '../index.js'

async function deleteTweet(id) {
  const request = {
    url: `${process.env.MANAGE_TWEETS_API_ENDPOINT}/${id}`,
    method: 'DELETE',
  }

  const authHeader = OAuth1Helper.getAuthHeaderForRequest(request)

  await axios
    .delete(request.url, { headers: authHeader })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err))
}

export default deleteTweet
