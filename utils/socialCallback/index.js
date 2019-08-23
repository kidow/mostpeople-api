const { encodeToken } = require('@lib/jwt')
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://mostpeople.kr'
    : 'http://localhost:3000'

module.exports = async (req, res, next, err, user, info) => {
  try {
    if (err) next(err)
    else if (user) {
      delete user.password
      const token = await encodeToken(Object.assign({}, user))
      const options = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain:
          process.env.NODE_ENV === 'production' ? '.mostpeople.kr' : 'localhost'
      }
      if (info && info.code === 1005) {
        req.login(user, err => {
          if (err) return next(err)
          res
            .cookie('access_token', token, options)
            .send(
              `<script>alert('${
                info.message
              }'); location.href='${baseURL}'</script>`
            )
        })
      } else
        req.login(user, err => {
          if (err) return next(err)
          res.cookie('access_token', token, options).redirect(baseURL)
        })
    } else if (info.code === 1001 || info.code === 1002) {
      req.session.email = info.email
      res.send(
        `<script>alert('${
          info.message
        }');location.href='${baseURL}/signup/social'</script>`
      )
    } else if (info.code === 1003 || info.code === 1004)
      res.send(
        `<script>alert('${
          info.message
        }'); location.href='${baseURL}/login'</script>`
      )
  } catch (err) {
    next(err)
  }
}
