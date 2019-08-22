const con = require('@mysql')

const find = ({ search, offset }) => {
  const searchSQL = search
    ? `WHERE (u.nickname LIKE ? OR u.email LIKE ? OR o.korName LIKE ?)`
    : ''
  const offsetSQL = offset ? 'OFFSET ?' : ''
  let injection = []
  if (search) injection.push(`%${search}%`, `%${search}%`, `%${search}%`)
  if (offset) injection.push(Number(offset))
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        u.id,
        u.status,
        u.email,
        u.nickname,
        o.korName,
        u.provider,
        u.facebookUrl,
        u.twitterUrl,
        u.intro,
        i.url AS profileUrl,
        DATE_FORMAT(u.createdAt, '%Y-%m-%d %T') AS createdAt,
        (
          SELECT
            COUNT(posts.id)
          FROM
            users
          LEFT JOIN
            posts
          ON
            posts.userId = users.uuid
          WHERE
            u.uuid = posts.userId AND
            posts.status = 1
        ) AS postCount,
        (
          SELECT
            COUNT(comments.id)
          FROM
            users
          LEFT JOIN
            comments
          ON
            comments.userId = users.uuid
          WHERE
            u.uuid = comments.userId AND
            comments.status = 1
        ) AS commentCount
      FROM
        users u

      LEFT JOIN
        images i
      ON
        i.id = (
          SELECT
            MAX(id)
          FROM
            images
          WHERE
            images.id = u.imageId
        )
      LEFT JOIN
        occupations o
      ON
        o.uuid = u.occupationId

      ${searchSQL}

      LIMIT 20
      ${offsetSQL}
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findTotal = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        COUNT(id) as total

      FROM
        users
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result[0].total)
    })
  })
}

const findById = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        u.id,
        u.status,
        u.email,
        u.nickname,
        o.korName,
        u.provider,
        u.facebookUrl,
        u.twitterUrl,
        u.intro,
        i.url AS profileUrl,
        DATE_FORMAT(u.createdAt, '%Y-%m-%d %T') AS createdAt,
        (
          SELECT
            COUNT(posts.id)
          FROM
            users
          LEFT JOIN
            posts
          ON
            posts.userId = users.uuid
          WHERE
            u.uuid = posts.userId AND
            posts.status = 1
        ) AS postCount,
        (
          SELECT
            COUNT(comments.id)
          FROM
            users
          LEFT JOIN
            comments
          ON
            comments.userId = users.uuid
          WHERE
            u.uuid = comments.userId AND
            comments.status = 1
        ) AS commentCount
      FROM
        users u

      LEFT JOIN
        images i
      ON
        i.id = (
          SELECT
            MAX(id)
          FROM
            images
          WHERE
            images.id = u.imageId
        )
      LEFT JOIN
        occupations o
      ON
        o.uuid = u.occupationId

      WHERE
        u.id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result[0])
    })
  })
}

module.exports = {
  find,
  findTotal,
  findById
}
