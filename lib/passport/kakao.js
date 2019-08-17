const KakaoStrategy = require('passport-kakao').Strategy
const User = require('@models/users')
const uuid = require('@lib/uuid')

module.exports = passport => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_APP_ID,
        callbackURL: '/auth/callback/kakao'
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('profile: ', profile)
        try {
          const user = await User.findByProviderId(profile.id)
          if (user.status === 3)
            return done(null, false, {
              message: '밴 당한 유저입니다.',
              code: 1003
            })
          else if (user.status === 4) {
            await User.update([{ status: 1, deletedAt: null }, user.email])
            user.status = 1
            return done(null, user)
          }
          if (user && !user.nickname) {
            return done(null, false, {
              message: '가입되었으나, 개인정보는 작성하지 않았습니다.',
              email: profile._json.kaccount_email,
              code: 1002
            })
          } else if (user) done(null, user)
          else {
            await User.create({
              uuid: uuid(),
              provider: profile.provider,
              providerId: profile.id,
              email: profile._json.kaccount_email
            })
            done(null, false, {
              message: '가입된 유저가 아닙니다. 회원가입으로 이동합니다.',
              code: 1001
            })
          }
        } catch (err) {
          done(err)
        }
      }
    )
  )
}
