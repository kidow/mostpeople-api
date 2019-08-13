const passport = require('passport')
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.mostpeople.kr'
    : 'http://localhost:3000'

// GET /auth/callback/google
module.exports = (req, res, next) => {
  passport.authenticate(
    'google',
    {
      scope: ['email']
    },
    (err, user, info) => {
      try {
        if (err) return next(err)
        else if (user) {
          delete user.password
          req.login(user, err => {
            if (err) return next(err)
            return res.redirect(baseURL)
          })
        } else if (info.code === 1001 || info.code === 1002)
          res.redirect(`${baseURL}/signup/social?email=${info.email}`)
        else if (info.code === 1003)
          return res.status(401).json({ message: '밴 당한 유저입니다.' })
      } catch (err) {
        next(err)
      }
    }
  )(req, res, next)
}
