const NaverStrategy = require('passport-naver').Strategy
const User = require('@models/users')
const uuid = require('@lib/uuid')

module.exports = passport => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_APP_ID,
        clientSecret: process.env.NAVER_SECRET_KEY,
        callbackURL: '/auth/callback/naver'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findProfile({
            email: profile._json.email
          })
          if (user.status === 3)
            done(null, false, {
              message: '밴 당한 유저입니다.',
              code: 1003
            })
          else if (user.status === 4) {
            await User.update([
              { status: 1, deletedAt: null },
              { email: user.email }
            ])
            user.status = 1
            done(null, user, {
              message: '재가입을 환영합니다!',
              code: 1005
            })
          } else if (user && user.id && !user.nickname)
            done(null, false, {
              message: '가입되었으니ㅏ, 개인정보는 작성하지 않았습니다.',
              email: profile._json.email,
              code: 1002
            })
          else if (user.email && user.provider !== 'naver')
            done(null, false, {
              message: '해당 이메일로 가입한 계정이 존재합니다.',
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
