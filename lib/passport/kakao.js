const KakaoStrategy = require('passport-kakao').Strategy
const { NODE_ENV, KAKAO_APP_ID, KAKAO_APP_TEST_ID } = process.env
const passportOauth = require('@utils/passportOauth')

module.exports = passport => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: NODE_ENV === 'production' ? KAKAO_APP_ID : KAKAO_APP_TEST_ID,
        callbackURL: '/auth/callback/kakao'
      },
      async (accessToken, refreshToken, profile, done) =>
        passportOauth(profile, done)
    )
  )
}
