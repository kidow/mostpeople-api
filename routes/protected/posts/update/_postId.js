const Post = require('@models/posts')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// PUT /prt/posts/:postId
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    occupationId: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    boardType: Joi.number().required()
  })
  validate(req.body, schema, res, next)

  const { postId } = req.params
  const { userId } = req.query

  if (req.user.uuid !== userId)
    return res.status(401).json({ message: '권한이 없습니다.' })

  try {
    await Post.protected.update([req.body, postId])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
