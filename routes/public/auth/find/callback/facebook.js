const passport = require('passport')
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://mostpeople.kr'
    : 'http://localhost:3000'

// GET /auth/callback/facebook
module.exports = (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    try {
      if (err) return next(err)
      else if (user) {
        delete user.password
        if (info && info.code === 1005)
          req.login(user, err => {
            if (err) return next(err)
            res.send(
              `<script>alert('${
                info.message
              }'); location.href='${baseURL}'</script>`
            )
          })
        else
          req.login(user, err => {
            if (err) return next(err)
            res.redirect(baseURL)
          })
      } else if (info.code === 1001 || info.code === 1002) {
        res.send(
          `<script>alert('${
            info.message
          }');location.href='${baseURL}/signup/social?email=${
            info.email
          }'</script>`
        )
      } else if (info.code === 1003 || info.code === 1004)
        res.send(
          `<script>alert('${
            info.message
          }');location.href='${baseURL}/login'</script>`
        )
    } catch (err) {
      next(err)
    }
  })(req, res, next)
}
