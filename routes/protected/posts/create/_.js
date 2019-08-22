const Post = require('@models/posts')
const Occupation = require('@models/occupations')
const Joi = require('@hapi/joi')
const uuid = require('@lib/uuid')
const recaptcha = require('@lib/recaptcha')
const validate = require('@lib/validate')

// POST /prt/posts
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const schema = Joi.object().keys({
    occupationId: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    boardType: Joi.string().required()
    // token: Joi.string().required()
  })
  validate(req.body, schema, res, next)

  const { occupationId, title, content, boardType } = req.body
  const UUID = uuid()
  let payload = {
    title,
    content,
    userId: req.user.uuid,
    uuid: UUID,
    boardType,
    occupationId
  }
  try {
    // const { success } = await recaptcha(token, req.ip)
    // if (!success)
    //   return res.status(400).json({
    //     message:
    //       '죄송합니다. 알 수 없는 오류가 발생했습니다. 나중에 다시 시도해 주세요.'
    //   })
    await Post.protected.create(payload)
    res.status(200).json({ postId: UUID })
  } catch (err) {
    next(err)
  }
}
