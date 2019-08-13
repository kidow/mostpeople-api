const con = require('@mysql')

const destroy = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM
        likes
      WHERE
        userId = ? AND
        refId = ?
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
