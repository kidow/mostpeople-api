const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('@models/users')

module.exports = passport => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: true
      },
      async (email, password, done) => {
        try {
          const user = await User.findProfile({ email })
          if (user.status === 3)
            done(null, false, {
              message: '밴 당한 유저입니다',
              status: 403
            })
          else if (user && user.email) {
            const validate = await bcrypt.compareSync(password, user.password)
            if (validate) {
              delete user.password
              done(null, user)
            } else
              done(null, false, {
                message: '비밀번호가 일치하지 않습니다',
                status: 400
              })
          } else
            done(null, false, {
              message: '가입되지 않은 회원입니다',
              status: 404
            })
        } catch (err) {
          done(err)
        }
      }
    )
  )
}
