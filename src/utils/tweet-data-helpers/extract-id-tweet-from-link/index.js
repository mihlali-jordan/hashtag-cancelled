function extractTweetIDFromLink(link) {
  const split_link = link.split('/')
  return split_link[split_link - 1].split('?')[0]
}

export default extractTweetIDFromLink
