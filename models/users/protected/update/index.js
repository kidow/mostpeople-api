const con = require('@mysql')

const update = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE
        users
      SET
        ?
      WHERE
        ?
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
