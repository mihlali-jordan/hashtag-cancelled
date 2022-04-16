import fs from 'fs'

function readTweetData(filepath) {
  const readableStream = fs.createReadStream(filepath, 'utf8')

  readableStream.on('error', (error) => {
    console.error(`error: ${error.message}`)
  })

  readableStream.on('data', (chunk) => {
    console.log(chunk)
  })
}

export default readTweetData
