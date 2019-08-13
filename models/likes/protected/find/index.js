const con = require('@mysql')

const findByRefId = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id
      FROM
        likes
      WHERE
        userId = ? AND
        refId = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (!result.length) return resolve({})

      resolve(result[0])
    })
  })
}

module.exports = {
  findByRefId
}
