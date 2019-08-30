const { encodeToken } = require('@lib/jwt')
const cookieOptions = require('@utils/cookieOptions')
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://mostpeople.kr'
    : 'http://localhost:3000'

module.exports = async (req, res, next, err, user, info) => {
  const { redirect } = req.cookies || ''
  try {
    if (err) next(err)
    else if (user) {
      delete user.password
      const token = await encodeToken(Object.assign({}, user))
      if (info && info.code === 1005) {
        req.login(user, err => {
          if (err) return next(err)
          res.cookie('access_token', token, cookieOptions)
          if (redirect)
            res.clearCookie('redirect', {
              path: '/',
              domain:
                process.env.NODE_ENV === 'production'
                  ? '.mostpeople.kr'
                  : 'localhost'
            })
          res.send(
            `<script>alert('${info.message}'); location.href='${baseURL +
              redirect}'</script>`
          )
        })
      } else
        req.login(user, err => {
          if (err) return next(err)
          res.cookie('access_token', token, cookieOptions)
          if (redirect)
            res.clearCookie('redirect', {
              path: '/',
              domain:
                process.env.NODE_ENV === 'production'
                  ? '.mostpeople.kr'
                  : 'localhost'
            })
          res.redirect(baseURL + redirect)
        })
    } else if (info.code === 1001 || info.code === 1002) {
      const token = await encodeToken({
        email: info.email,
        emailVerified: !!info.emailVerified,
        providerId: info.providerId
      })
      const redirect = redirect ? `?redirect=${redirect}` : ''
      res.cookie('profile_token', token, cookieOptions)
      res.send(
        `<script>alert('${info.message}');location.href='${baseURL}/signup/social${redirect}'</script>`
      )
    } else if (info.code === 1003 || info.code === 1004)
      res.send(
        `<script>alert('${info.message}'); location.href='${baseURL}/signup'</script>`
      )
  } catch (err) {
    next(err)
  }
}
