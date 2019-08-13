module.exports = html => {
  const $ = require('cheerio').load(html)

  let text = $.text() ? $.text().trim() : ''
  const pretext = text.substring(0, 140) || ''
  const thumbnailUrl = $('img').attr('src') || ''

  return {
    text,
    pretext,
    thumbnailUrl
  }
}
