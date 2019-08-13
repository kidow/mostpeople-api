const con = require('@mysql')

const find = ({ search, offset }) => {
  const searchSQL = search ? `WHERE (title LIKE ? OR content LIKE ?)` : ''
  const offsetSQL = offset ? 'OFFSET ?' : ''
  let injection = []
  if (search) injection.push(`%${search}%`, `%${search}%`)
  if (offset) injection.push(Number(offset))
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        p.id,
        u.nickname,
        p.status,
        p.title,
        p.content,
        DATE_FORMAT(p.createdAt, '%Y-%m-%d %T') AS createdAt

      FROM
        posts p
      
      JOIN
        users u
      ON
        p.userId = u.uuid

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
        posts
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
        p.id,
        u.nickname,
        p.status,
        p.title,
        p.content,
        DATE_FORMAT(p.createdAt, '%Y-%m-%d %T') AS createdAt

      FROM
        posts p

      JOIN
        users u
      ON
        u.uuid = p.userId

      WHERE
        p.id = ?
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
