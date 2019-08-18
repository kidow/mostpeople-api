const FacebookStrategy = require('passport-facebook').Strategy
const User = require('@models/users')
const uuid = require('@lib/uuid')

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_SECRET_KEY,
        callbackURL: '/auth/callback/facebook',
        profileFields: ['email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findByEmail(profile.id)
          if (user.status === 3)
            done(null, false, {
              message: '밴 당한 유저입니다.',
              code: 1003
            })
          else if (user.status === 4) {
            await User.update([{ status: 1, deletedAt: null }, user.email])
            user.status = 1
            done(null, user, {
              message: '재가입을 환영합니다!',
              code: 1005
            })
          } else if (user && user.id && !user.nickname)
            done(null, false, {
              message: '가입되었으나, 개인정보는 작성하지 않았습니다.',
              email: profile._json.email,
              code: 1002
            })
          else if (user.email && user.provider !== 'facebook')
            done(null, false, {
              message: '이미 같은 이메일로 가입한 상태입니다.',
              code: 1004
            })
          else if (user.id) done(null, user)
          else {
            await User.create({
              uuid: uuid(),
              provider: profile.provider,
              providerId: profile.id,
              email: profile._json.email
            })
            done(null, false, {
              message: '가입된 유저가 아닙니다. 회원가입으로 이동합니다.',
              email: profile._json.email,
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
