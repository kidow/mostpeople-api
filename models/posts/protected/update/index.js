const con = require('@mysql')

const update = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE
        posts
      SET
        ?
      WHERE
        uuid = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  update
}
