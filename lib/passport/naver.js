const NaverStrategy = require('passport-naver').Strategy
const passportOauth = require('@utils/passportOauth')

module.exports = passport => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_APP_ID,
        clientSecret: process.env.NAVER_SECRET_KEY,
        callbackURL: '/auth/callback/naver'
      },
      async (accessToken, refreshToken, profile, done) =>
        passportOauth(profile, done)
    )
  )
}
