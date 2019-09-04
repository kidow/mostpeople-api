const con = require('@mysql')

const findSitemaps = _ => {
  return new Promise((resolve, reject) => {
    const sql = `
      (SELECT
        CONCAT("/board/", o.korName, '-', o.uuid) AS url,
        "weekly" AS changefreq,
        DATE_FORMAT(o.updatedAt, "%Y-%m-%dT%T.000Z") AS lastmodISO
      FROM
        occupations o
      WHERE
        o.createdAt > DATE_ADD(NOW(), INTERVAL -6 MONTH)
      ORDER BY
        o.createdAt DESC)
    UNION ALL
      (SELECT
        CONCAT("/post/", p.uuid) AS url,
        "weekly" AS changefreq,
        DATE_FORMAT(p.updatedAt, "%Y-%m-%dT%T.000Z") AS lastmodISO
      FROM
        posts p
      WHERE
        p.createdAt > DATE_ADD(NOW(), INTERVAL -3 MONTH)
      ORDER BY
        p.createdAt DESC)
        LIMIT 40000
    `
    con.query(sql, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  findSitemaps
}
