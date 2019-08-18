const con = require('@mysql')

const findByEmail = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        u.id,
        u.uuid,
        u.email,
        u.status,
        u.password,
        u.nickname,
        u.provider,
        u.providerId,
        u.occupationId,
        u.facebookUrl,
        u.twitterUrl,
        u.intro,
        i.url AS profileUrl,
        i.alt AS profileAlt,
        o.korName
      FROM
        users u
      LEFT JOIN
        images i
      ON
        u.imageId = i.id
      LEFT JOIN
        occupations o
      ON
        o.uuid = u.occupationId
      WHERE
        u.email = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (!result.length) return resolve({})

      resolve(result[0])
    })
  })
}

const findById = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        u.id,
        u.uuid,
        u.email,
        u.status,
        u.password,
        u.nickname,
        u.provider,
        u.providerId,
        u.occupationId,
        u.facebookUrl,
        u.twitterUrl,
        u.intro,
        i.url AS profileUrl,
        i.alt AS profileAlt,
        o.korName
      FROM
        users u
      LEFT JOIN
        images i
      ON
        u.imageId = i.id
      LEFT JOIN
        occupations o
      ON
        o.uuid = u.occupationId
      WHERE
        u.id = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (!result.length) return resolve({})

      resolve(result[0])
    })
  })
}

const findByUuid = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        uuid,
        email,
        nickname,
        occupationId
      FROM
        users
      WHERE
        uuid = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      if (!result.length) return resolve({})

      resolve(result[0])
    })
  })
}

const findByNickname = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        u.id,
        u.nickname,
        i.url AS profileUrl,
        u.facebookUrl,
        u.twitterUrl,
        u.email,
        o.korName,
        u.intro
      FROM
        users u

      LEFT JOIN
        images i
      ON
        i.id = (
          SELECT
            MAX(id)
          FROM
            images
          WHERE
            images.id = u.imageId
        )
      LEFT JOIN
        occupations o
      ON
        o.uuid = u.occupationId
      WHERE
        u.nickname = ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result[0])
    })
  })
}

const findBySearch = injection => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        u.uuid,
        u.nickname,
        i.url AS profileUrl,
        o.korName
      FROM
        users u
      LEFT JOIN
        images i
      ON
        i.id = (
          SELECT
            MAX(id)
          FROM
            images
          WHERE
            images.id = u.imageId
        )
      LEFT JOIN
        occupations o
      ON
        o.uuid = u.occupationId
      WHERE
        u.nickname LIKE ?
    `
    con.query(sql, injection, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  findByEmail,
  findById,
  findByUuid,
  findByNickname,
  findBySearch
}
