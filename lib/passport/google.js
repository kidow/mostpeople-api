const GoogleStrategy = require('passport-google-oauth20').Strategy
const passportOauth = require('@utils/passportOauth')

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        callbackURL: '/auth/callback/google'
      },
      async (accessToken, refreshToken, profile, done) =>
        passportOauth(profile, done)
    )
  )
}
