#!/usr/bin/env node
import 'dotenv/config'

// Local modules
import { welcome, getApiCredentials } from './utils/index.js'

console.clear()
await welcome()
const credentials = await getApiCredentials()
