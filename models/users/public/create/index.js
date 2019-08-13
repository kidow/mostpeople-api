const con = require('@mysql')

const create = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO
        users
      SET
        ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  create
}
