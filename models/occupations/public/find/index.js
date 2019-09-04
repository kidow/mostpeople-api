const con = require('@mysql')

const findById = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        o.id,
        o.uuid,
        o.korName,
        i.content AS intro,
        i.createdAt,
        u.nickname
      FROM
        occupations o

      LEFT JOIN
        introductions i
      ON
        i.id = (
          SELECT
            MAX(id)
          FROM
            introductions
          WHERE
            introductions.occupationId = o.uuid
        )

      LEFT JOIN
        users u
      ON
        i.userId = u.uuid

      JOIN
        static_professions p
      ON
        o.professionId = p.id

      WHERE
        o.uuid = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (!result.length) return resolve({})

      resolve(result[0])
    })
  })
}

const findByName = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id,
        uuid,
        professionId,
        korName
      FROM
        occupations
      WHERE
        korName LIKE ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findByGroup = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        GROUP_CONCAT(o.uuid) AS uuid,
        p.name,
        GROUP_CONCAT(o.korName) AS korName,
        (
          SELECT
            COUNT(posts.id)
          FROM
            posts
          LEFT JOIN
            occupations
          ON
            occupations.uuid = posts.occupationId
          WHERE
            occupations.uuid = o.uuid AND
            posts.createdAt > DATE_ADD(NOW(), INTERVAL -1 DAY) AND
            posts.status = 1
        ) AS postsCount
      FROM
        occupations o
      JOIN
        static_professions p
      ON
        o.professionId = p.id
      GROUP BY
        p.name
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findBySearch = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        uuid,
        korName
      FROM
        occupations
      WHERE
        korName LIKE ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findByGroupByNew = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        GROUP_CONCAT(o.uuid) AS uuid,
        '신규' AS name,
        GROUP_CONCAT(o.korName) AS korName,
        (
          SELECT
            COUNT(posts.id)
          FROM
            posts
          LEFT JOIN
            occupations
          ON
            occupations.uuid = posts.occupationId
          WHERE
            occupations.uuid = o.uuid AND
            posts.createdAt > DATE_ADD(NOW(), INTERVAL -1 DAY) AND
            posts.status = 1
        ) AS postsCount
      FROM
        occupations o
      WHERE
        o.createdAt > DATE_ADD(NOW(), INTERVAL -7 DAY)
      ORDER BY
        o.createdAt DESC
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result[0])
    })
  })
}

module.exports = {
  findById,
  findByName,
  findByGroup,
  findBySearch,
  findByGroupByNew
}
