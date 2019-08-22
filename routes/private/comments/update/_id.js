const Comment = require('@models/comments')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// PUT /prv/comments/:id
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })
  if (req.user.status !== 2)
    return res.status(401).json({ message: '관리자 권한이 아닙니다.' })

  const schema = Joi.object().keys({
    status: Joi.number().required()
  })
  validate(req.body, schema, res, next)
  // const { error } = Joi.validate(req.body, schema)
  // if (error) return next(error)

  try {
    await Comment.private.update([req.body, req.params.id])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
