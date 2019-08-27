const con = require('@mysql')

const findTotal = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        (
          SELECT
            COUNT(id)
          FROM
            users
        ) AS user,
        (
          SELECT
            COUNT(id)
          FROM
            posts
        ) AS post,
        (
          SELECT
            COUNT(id)
          FROM
            comments
        ) AS comment,
        (
          SELECT
            COUNT(id)
          FROM
            occupations
        ) AS occupation,
        (
          SELECT
            COUNT(id)
          FROM
            static_professions
        ) AS profession
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result[0])
    })
  })
}

const findWeeklyUser = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        DATE_FORMAT(createdAt, '%m.%d') AS date,
        COUNT(id) AS total
      FROM
        users
      WHERE
        createdAt > DATE_ADD(NOW(), INTERVAL -8 DAY)
      GROUP BY
        date
      ORDER BY
        date
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findWeeklyKakao = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        DATE_FORMAT(createdAt, '%m.%d') AS date,
        COUNT(id) AS total
      FROM
        users
      WHERE
        createdAt > DATE_ADD(NOW(), INTERVAL -8 DAY) AND
        provider = 'kakao'
      GROUP BY
        date
      ORDER BY
        date
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findWeeklyFacebook = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        DATE_FORMAT(createdAt, '%m.%d') AS date,
        COUNT(id) AS total
      FROM
        users
      WHERE
        createdAt > DATE_ADD(NOW(), INTERVAL -8 DAY) AND
        provider = 'facebook'
      GROUP BY
        date
      ORDER BY
        date
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const findWeeklyGoogle = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        DATE_FORMAT(createdAt, '%m.%d') AS date,
        COUNT(id) AS total
      FROM
        users
      WHERE
        createdAt > DATE_ADD(NOW(), INTERVAL -8 DAY) AND
        provider = 'google'
      GROUP BY
        date
      ORDER BY
        date
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  findTotal,
  findWeeklyFacebook,
  findWeeklyGoogle,
  findWeeklyKakao,
  findWeeklyUser
}
