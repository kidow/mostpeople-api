const con = require('@mysql')

const find = ({ search, offset }) => {
  const searchSQL = search ? `WHERE (u.nickname LIKE ? OR content LIKE ?)` : ''
  const offsetSQL = offset ? 'OFFSET ?' : ''
  let injection = []
  if (search) injection.push(`%${search}%`, `%${search}%`)
  if (offset) injection.push(Number(offset))
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        r.id,
        r.refType,
        r.content,
        r.createdAt,
        u.nickname,
        r.status
      FROM
        reports r
      
      JOIN
        users u
      ON
        r.userId = u.uuid

      ${searchSQL}

      LIMIT 20
      ${offsetSQL}
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      return resolve(result)
    })
  })
}

const findTotal = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        COUNT(id) AS total

      FROM
        reports
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
        r.id,
        r.createdAt,
        u.nickname,
        r.refId,
        r.refType,
        r.content,
        r.status
      FROM
        reports r

      JOIN
        users u
      ON
        r.userId = u.uuid

      WHERE
        r.id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (!result.length) return resolve({})

      resolve(result)
    })
  })
}

module.exports = {
  find,
  findById,
  findTotal
}
