const con = require('@mysql')

const find = ({ search, offset }) => {
  const searchSQL = search
    ? `WHERE (c.content LIKE ? OR u.nickname LIKE ?)`
    : ''
  const offsetSQL = offset ? 'OFFSET ?' : ''
  let injection = []
  if (search) injection.push(`%${search}%`, `%${search}%`)
  if (offset) injection.push(Number(offset))
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        c.id,
        c.status,
        c.parentId,
        u.nickname,
        DATE_FORMAT(c.createdAt, '%Y-%m-%d %T') AS createdAt,
        p.title,
        c.content

      FROM
        comments c

      JOIN
        users u
      ON
        u.uuid = c.userId

      JOIN
        posts p
      ON
        p.uuid = c.postId

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
        comments
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
        c.id,
        c.status,
        c.parentId,
        u.nickname,
        DATE_FORMAT(c.createdAt, '%Y-%m-%d %T') AS createdAt,
        c.content,
        p.title

      FROM
        comments c

      JOIN
        users u
      ON
        u.uuid = c.userId

      JOIN
        posts p
      ON
        p.uuid = c.postId

      WHERE
        c.id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (!result.length) return resolve({})

      resolve(result[0])
    })
  })
}

module.exports = {
  find,
  findTotal,
  findById
}
