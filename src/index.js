#!/usr/bin/env node
import axios from 'axios'

// Local modules
import { welcome, getApiCredentials } from './utils/index.js'
import { OAuth1Helper } from './utils/index.js'

const base_url = 'https://api.twitter.com/2/tweets'
const tweet_id = '151517405906724864'

console.clear()
await welcome()
const credentials = await getApiCredentials()
console.log(credentials)

const request = {
  url: `${base_url}/${tweet_id}`,
  method: 'DELETE',
}

const authHeader = OAuth1Helper.getAuthHeaderForRequest(request)

await axios
  .delete(request.url, { headers: authHeader })
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
