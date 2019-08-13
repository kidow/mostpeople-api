const con = require('@mysql')
const cheerio = require('@lib/cheerio')

const findAll = ({ offset }) => {
  return new Promise((resolve, reject) => {
    const offsetSQL = offset ? 'OFFSET ?' : ''
    let injection = []
    if (offset) injection.push(Number(offset))
    const sql = `
      SELECT
        *
      FROM
        posts
      WHERE
        userId = ?
      LIMIT 8
      ${offsetSQL}
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findTimeline = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        p.uuid,
        p.title,
        p.content,
        p.viewCount,
        p.occupationId,
        o.korName,
        (
          SELECT
            COUNT(likes.id)
          FROM
            posts
          LEFT JOIN
            likes
          ON
            likes.refId = posts.uuid
          WHERE
            posts.uuid = p.uuid
        ) AS likeCount,
        (
          SELECT
            COUNT(comments.id)
          FROM
            posts
          LEFT JOIN
            comments
          ON
            comments.postId = posts.uuid
          WHERE
            posts.uuid = p.uuid AND
            comments.status = 1
        ) AS commentCount
      FROM
        posts p
      JOIN
        occupations o
      ON
        o.uuid = p.occupationId
      WHERE
        p.userId = ? AND
        p.status = 1
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      result.forEach(post => {
        let { pretext, thumbnailUrl } = cheerio(post.content)
        post.content = pretext
        post.thumbnailUrl = thumbnailUrl
        return
      })

      resolve(result)
    })
  })
}

const findById = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        p.userId,
        p.title,
        p.content,
        o.korName,
        p.boardType,
        p.status
      FROM
        posts p

      JOIN
        occupations o
      ON
        p.occupationId = o.uuid

      WHERE
        p.uuid = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (!result.length) return resolve({})

      resolve(result[0])
    })
  })
}

module.exports = {
  findAll,
  findTimeline,
  findById
}
