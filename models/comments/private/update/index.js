const con = require('@mysql')

const updateOne = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE
        comments
      SET
        ?
      WHERE
        id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const update = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE
        comments
      SET
        ?
      WHERE
        id IN ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  update,
  updateOne
}
