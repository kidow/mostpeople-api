const con = require('@mysql')

module.exports = (sql, injection) => {
  return new Promise((resolve, reject) => {
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}
