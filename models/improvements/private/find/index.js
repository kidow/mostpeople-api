const con = require('@mysql')

const find = ({ search, offset }) => {
  const searchSQL = search
    ? `WHERE (i.content LIKE ? OR u.nickname LIKE ?)`
    : ''
  const offsetSQL = offset ? 'OFFSET ?' : ''
  let injection = []
  if (search) injection.push(`%${search}%`, `%${search}%`)
  if (offset) injection.push(Number(offset))
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        i.id,
        i.content,
        DATE_FORMAT(i.createdAt, '%Y-%m-%d %T') AS createdAt,
        u.nickname
      FROM
        improvements i

      JOIN
        users u
      ON
        u.uuid = i.userId

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
        COUNT(id) AS total

      FROM
        improvements
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
        i.id,
        i.content,
        DATE_FORMAT(i.createdAt, '%Y-%m-%d %T') AS createdAt,
        u.nickname

      FROM
        improvements i

      JOIN
        users u
      ON
        u.uuid = i.userId

      WHERE
        i.id = ?
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
  findById,
  findTotal
}
