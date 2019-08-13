const con = require('@mysql')

const destroy = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE
        comments
      SET
        status = 4
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
