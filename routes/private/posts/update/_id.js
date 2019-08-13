const Post = require('@models/posts')
const Joi = require('@hapi/joi')

// PUT /prv/posts/:id
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })
  if (req.user.status !== 2)
    return res.status(401).json({ message: '관리자 권한이 아닙니다.' })

  const schema = Joi.object().keys({
    status: Joi.number().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return next(error)

  try {
    await Post.private.update([req.body, req.params.id])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
