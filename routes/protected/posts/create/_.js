const Post = require('@models/posts')
const Occupation = require('@models/occupations')
const Joi = require('@hapi/joi')
const uuid = require('@lib/uuid')
const recaptcha = require('@lib/recaptcha')

// POST /prt/posts
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const schema = Joi.object().keys({
    occupation: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    boardType: Joi.string().required(),
    token: Joi.string().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error)
    return res
      .status(412)
      .json({ message: '값을 올바르게 입력했는지 확인해주세요' })

  const { occupation, title, content, boardType, token } = req.body
  const UUID = uuid()
  let payload = {
    title,
    content,
    userId: req.user.uuid,
    uuid: UUID,
    boardType
  }
  try {
    const { success } = await recaptcha(token, req.ip)
    if (!success)
      return res.status(400).json({
        message:
          '죄송합니다. 알 수 없는 오류가 발생했습니다. 나중에 다시 시도해 주세요.'
      })
    const result = await Occupation.findByName(`%${occupation}%`)
    payload.occupationId = result[0].id
    await Post.protected.create(payload)
    res.status(200).json({ occupationId: result[0].id, postId: UUID })
  } catch (err) {
    next(err)
  }
}
