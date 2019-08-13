const con = require('@mysql')

const findAll = ({ offset }) => {
  return new Promise((resolve, reject) => {
    const offsetSQL = offset ? 'OFFSET ?' : ''
    let injection = []
    if (offset) injection.push(Number(offset))
    const sql = `
      SELECT
        *
      FROM
        comments
      WHERE
        userId = ?
      LIMIT 8
      ${offsetSQL}
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findTimeline = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        c.id,
        c.content,
        c.createdAt,
        0 AS isEdit,
        u.nickname,
        p.title,
        0 AS loading,
        p.uuid
      FROM
        comments c
      
      JOIN
        users u
      ON
        u.uuid = c.userId
      
      JOIN
        posts p
      ON
        c.postId = p.uuid

      WHERE
        c.userId = ? AND
        c.status = 1
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      result.forEach(comment => {
        comment.isEdit = false
        comment.loading = false
        return
      })

      resolve(result)
    })
  })
}

module.exports = {
  findAll,
  findTimeline
}
