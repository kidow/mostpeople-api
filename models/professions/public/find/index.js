const con = require('@mysql')

const find = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id,
        name,
        null AS occupations
      FROM
        static_professions
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  find
}
