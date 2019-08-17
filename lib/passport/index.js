const User = require('@models/users')

module.exports = passport => {
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => {
    User.findById(user.insertId || user.id)
      .then(user => done(null, user))
      .catch(err => done(err))
  })

  require('./login')(passport)
  require('./signup')(passport)
  require('./google')(passport)
  require('./facebook')(passport)
  require('./kakao')(passport)
}
