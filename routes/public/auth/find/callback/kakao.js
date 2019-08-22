const passport = require('passport')
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://mostpeople.kr'
    : 'http://localhost:3000'

// GET /auth/callback/kakao
module.exports = (req, res, next) => {
  passport.authenticate(
    'kakao',
    {
      scope: ['email']
    },
    (err, user, info) => {
      try {
        if (err) {
          console.log(1)
          next(err)
        } else if (user) {
          console.log(2)
          delete user.password
          if (info && info.code === 1005) {
            console.log(3)
            req.login(user, err => {
              if (err) return next(err)
              res.send(
                `<script>alert('${
                  info.message
                }'); location.href='${baseURL}'</script>`
              )
            })
          } else {
            console.log(4)
            req.login(user, err => {
              if (err) return next(err)
              res.redirect(baseURL)
            })
          }
        } else if (info.code === 1001 || info.code === 1002) {
          console.log(5)
          res.send(
            `<script>alert('${
              info.message
            }');location.href='${baseURL}/signup/social?email=${
              info.email
            }'</script>`
          )
        } else if (info.code === 1003 || info.code === 1004) {
          console.log(6)
          res.send(
            `<script>alert('${
              info.message
            }'); location.href='${baseURL}/login'</script>`
          )
        }
      } catch (err) {
        next(err)
      }
    }
  )(req, res, next)
}
