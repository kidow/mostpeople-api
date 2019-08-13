const con = require('@mysql')

const find = ({ search, offset }) => {
  const searchSQL = search ? `WHERE name LIKE ?` : ''
  const offsetSQL = offset ? 'OFFSET ?' : ''
  let injection = []
  if (search) injection.push(`%${search}%`)
  if (offset) injection.push(Number(offset))
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id,
        name
      FROM
        static_professions

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
        static_professions
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
        id,
        name

      FROM
        static_professions

      WHERE
        id = ?
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
