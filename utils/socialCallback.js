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
      req.login(user, err => {
        if (err) return next(err)
        res.cookie('access_token', token, cookieOptions(1))
        if (redirect) res.clearCookie('redirect', cookieOptions())
        if (info && info.code === 1005)
          res.send(
            `<script>alert('${info.message}'); location.href='${baseURL +
              redirect}'</script>`
          )
        else res.redirect(baseURL + redirect)
      })
    } else if (info.code === 1001 || info.code === 1002) {
      const token = await encodeToken({
        email: info.email
      })
      const redirectURL = redirect ? `?redirect=${redirect}` : ''
      res.cookie('profile_token', token, cookieOptions(1))
      res.send(
        `<script>alert('${info.message}');location.href='${baseURL}/signup/social${redirectURL}'</script>`
      )
    } else if (info.code === 1003 || info.code === 1004)
      res.send(
        `<script>alert('${info.message}'); location.href='${baseURL}/signup'</script>`
      )
  } catch (err) {
    next(err)
  }
}
