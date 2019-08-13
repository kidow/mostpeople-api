const con = require('@mysql')

// 중요! TDD를 위한 용도임!
const destroy = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM
        posts
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  destroy
}
