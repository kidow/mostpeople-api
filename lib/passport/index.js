const User = require('@models/users')

module.exports = passport => {
  passport.serializeUser((user, done) => {
    console.log('serialize user: ', user)
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    console.log('deserialize user: ', user)
    if (!user.id && !user.insertId) return done(null, {})
    User.findById(user.insertId || user.id)
      .then(user => done(null, user))
      .catch(err => done(err))
  })

  require('./login')(passport)
  require('./signup')(passport)
  require('./google')(passport)
  require('./facebook')(passport)
  require('./kakao')(passport)
  require('./naver')(passport)
}
