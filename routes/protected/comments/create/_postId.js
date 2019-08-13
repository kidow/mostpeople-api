const Comment = require('@models/comments')
const Joi = require('@hapi/joi')
const uuid = require('@lib/uuid')

// POST /prt/comments/:postId
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const schema = Joi.object().keys({
    content: Joi.string().required(),
    parentId: Joi.number()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.sendStatus(405)

  const { postId } = req.params

  try {
    const payload = Object.assign(req.body, {
      userId: req.user.uuid,
      uuid: uuid(),
      postId
    })
    const { insertId } = await Comment.protected.create(payload)
    const result = await Comment.findById(insertId)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
