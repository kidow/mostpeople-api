const con = require('@mysql')

const findByPostId = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        c.id,
        c.uuid,
        c.parentId,
        c.userId,
        u.nickname,
        i.url AS profileUrl,
        i.alt AS profileAlt,
        c.content,
        c.createdAt,
        0 AS loading,
        0 AS isEdit,
        0 AS isReply,
        '' AS reply,
        c.status,
        0 AS isLiked,
        (
          SELECT
            COUNT(likes.id)
          FROM
            comments
          LEFT JOIN
            likes
          ON
            comments.uuid = likes.refId
        ) AS likeCount

      FROM
        comments c

      JOIN
        users u
      ON
        c.userId = u.uuid

      LEFT JOIN
        images i
      ON
        u.imageId = i.id
        
      WHERE
        c.postId = ?

      ORDER BY
        IF (ISNULL(c.parentId), c.id, c.parentId), c.createdAt
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      result.forEach(comment => {
        comment.isEdit = false
        comment.loading = false
        comment.isReply = false
        comment.isLiked = false
        return
      })

      resolve(result)
    })
  })
}

const findById = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        c.id,
        c.uuid,
        c.parentId,
        c.userId,
        u.nickname,
        c.createdAt,
        c.content,
        0 AS loading,
        0 AS isEdit,
        0 AS isReply,
        '' AS reply,
        c.status,
        0 AS isLiked,
        COUNT(l.id) AS likeCount

      FROM
        comments c
      
      JOIN
        users u
      ON
        u.uuid = c.userId
      
      LEFT JOIN
        images i
      ON
        u.imageId = i.id

      LEFT JOIN
        likes l
      ON
        l.refId = c.uuid

      WHERE
        c.id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (!result.length) return resolve({})

      result[0].isEdit = false
      result[0].loading = false
      result[0].isReply = false
      result[0].isLiked = false

      resolve(result[0])
    })
  })
}

const findTimeline = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        c.content,
        c.createdAt,
        p.title,
        p.uuid
      FROM
        comments c
      JOIN
        posts p
      ON
        p.uuid = c.postId
      JOIN
        users u
      ON
        u.uuid = c.userId
      WHERE
        u.nickname = ? AND
        c.status = 1
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  findByPostId,
  findById,
  findTimeline
}
