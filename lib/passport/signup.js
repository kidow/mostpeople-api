const LocalStrategy = require('passport-local').Strategy
const User = require('@models/users')
const bcrypt = require('bcrypt')
const uuid = require('@lib/uuid')

const UUID = uuid()

module.exports = passport => {
  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        const { nickname, occupationId } = req.body
        try {
          const existed = await User.findByEmail(email)
          if (existed.email && existed.status !== 4)
            return done(null, false, {
              message: '이미 존재하는 계정입니다.',
              status: 400
            })
          const isNicknameExisted = await User.findByNickname(nickname)
          if (isNicknameExisted.id)
            return done(null, false, {
              message: '이미 존재하는 닉네임입니다.',
              status: 400
            })
          const passwordSalt = await bcrypt.hashSync(password, 12)
          let id
          if (existed.status === 4) {
            await User.update([{ status: 1 }, existed.email])
            id = existed.id
          } else {
            const { insertId } = await User.create({
              email,
              password: passwordSalt,
              nickname,
              uuid: UUID,
              occupationId
            })
            id = insertId
          }
          let user = {
            id,
            uuid: UUID,
            email,
            status: 1,
            nickname,
            providerId: null,
            occupationId,
            facebookUrl: '',
            twitterUrl: '',
            intro: '',
            profileUrl: '',
            profileAlt: ''
          }
          done(null, user)
        } catch (err) {
          done(err)
        }
      }
    )
  )
}
