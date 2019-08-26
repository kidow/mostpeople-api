const con = require('@mysql')
const cheerio = require('@lib/cheerio')

const findPopular = ({ search, offset, limit = 5 }) => {
  const searchSQL = search
    ? `AND (o.korName LIKE ? OR p.title LIKE ? OR u.nickname LIKE ?)`
    : ''
  const limitSQL = limit ? 'LIMIT ?' : ''
  const offsetSQL = offset ? 'OFFSET ?' : ''
  let injection = []
  if (search) injection.push(`%${search}%`, `%${search}%`, `%${search}%`)
  if (limit) injection.push(Number(limit))
  if (offset) injection.push(Number(offset))
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        p.uuid,
        o.korName,
        p.title,
        p.createdAt,
        u.nickname,
        p.viewCount,
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
        p.occupationId
      FROM
        posts p

      LEFT JOIN
        likes l
      ON
        l.refId = p.uuid
        
      JOIN
        occupations o
      ON 
        p.occupationId = o.uuid

      JOIN
        users u
      ON
        u.uuid = p.userId

      WHERE
        p.status = 1 AND
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
        ) > 10 AND
        DATE_FORMAT(p.createdAt, '%Y%m%d') > DATE_ADD(NOW(), INTERVAL -7 DAY) ${searchSQL}

      ${limitSQL}
      ${offsetSQL}
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findTotalPopular = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        COUNT(p.id) AS total
      FROM
        posts p

      LEFT JOIN
        likes l
      ON
        l.refId = p.uuid

      JOIN
        occupations o
      ON
        p.occupationId = o.uuid

      JOIN
        users u
      ON
        p.userId = u.uuid

      WHERE
        p.status = 1 AND
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
        ) > 10
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      if (!result.length) return resolve({})

      resolve(result[0].total)
    })
  })
}

const findById = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        p.title,
        p.content,
        p.createdAt,
        p.occupationId,
        o.korName,
        u.nickname,
        p.viewCount,
        p.boardType,
        p.userId,
        i.url AS profileUrl,
        i.alt AS profileAlt,
        COUNT(l.id) AS likeCount,
        p.status
      FROM
        posts p
      
      JOIN
        occupations o
      ON
        o.uuid = p.occupationId

      JOIN
        users u
      ON
        p.userId = u.uuid

      LEFT JOIN
        images i
      ON
        u.imageId = i.id

      LEFT JOIN
        likes l
      ON
        l.refId = p.uuid

      WHERE
        p.uuid = ? AND
        p.status = 1
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (!result[0].title) return resolve(result[0])

      let { thumbnailUrl, pretext } = cheerio(result[0].content)
      result[0].thumbnailUrl = thumbnailUrl
      result[0].pretext = pretext

      resolve(result[0])
    })
  })
}

const findByOccupationId = ({ offset }, occupationId) => {
  const offsetSQL = offset ? 'OFFSET ?' : ''
  let injection = [occupationId]
  if (offset) injection.push(Number(offset))
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        p.uuid,
        p.title,
        u.nickname,
        DATE_FORMAT(p.createdAt, '%Y-%m-%d') AS createdAt,
        p.viewCount,
        (
          SELECT
            COUNT(likes.id)
          FROM
            posts
          JOIN
            likes
          ON
            likes.refId = posts.uuid
          WHERE
            posts.uuid = p.uuid
        ) AS likeCount
      FROM
        posts p

      JOIN
        users u
      ON
        p.userId = u.uuid

      LEFT JOIN
        likes l
      ON
        l.refId = p.uuid

      WHERE
        p.occupationId = ? AND
        p.status = 1

      LIMIT 20
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
        users u
      ON
        u.uuid = p.userId
      JOIN
        occupations o
      ON
        o.uuid = p.occupationId
      WHERE
        u.nickname = ? AND
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

const findBySearch = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        p.uuid,
        p.occupationId,
        p.title,
        p.content,
        o.korName,
        DATE_FORMAT(p.createdAt, '%Y-%m-%d %T') AS createdAt
      FROM
        posts p
      JOIN
        occupations o
      ON
        o.uuid = p.occupationId
      WHERE
        p.status = 1 AND
        (p.title LIKE ? OR p.content LIKE ?)
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

const findTotalByOccupationId = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        COUNT(id) AS total
      FROM
        posts
      WHERE
        status = 1 AND
        occupationId = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result[0].total)
    })
  })
}

module.exports = {
  findPopular,
  findById,
  findByOccupationId,
  findTotalPopular,
  findTimeline,
  findBySearch,
  findTotalByOccupationId
}
