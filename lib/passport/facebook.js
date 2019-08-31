const FacebookStrategy = require('passport-facebook').Strategy
const passportOauth = require('@utils/passportOauth')
const {
  NODE_ENV,
  FACEBOOK_APP_ID,
  FACEBOOK_SECRET_KEY,
  FACEBOOK_APP_TEST_ID,
  FACEBOOK_SECRET_TEST_KEY
} = process.env
const API_BASE_URL =
  NODE_ENV === 'production'
    ? 'https://api.mostpeople.kr'
    : 'http://localhost:3001'
const clientID =
  NODE_ENV === 'production' ? FACEBOOK_APP_ID : FACEBOOK_APP_TEST_ID
const clientSecret =
  NODE_ENV === 'production' ? FACEBOOK_SECRET_KEY : FACEBOOK_SECRET_TEST_KEY

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: `${API_BASE_URL}/auth/callback/facebook`,
        profileFields: ['email']
      },
      async (accessToken, refreshToken, profile, done) =>
        passportOauth(profile, done)
    )
  )
}
