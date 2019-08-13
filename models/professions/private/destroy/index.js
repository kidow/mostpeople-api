const con = require('@mysql')

const destroy = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETR FROM
        static_professions
      WHERE
        id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  destroy
}
