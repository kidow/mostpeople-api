const Comment = require('@models/comments')
const Joi = require('@hapi/joi')

// PUT /prt/comments/:commentId
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const schema = Joi.object().keys({
    content: Joi.string().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.sendStatus(405)

  const { content } = req.body
  const { commentId } = req.params

  try {
    const comment = await Comment.findById(commentId)
    if (comment.userId !== req.user.uuid)
      return res.status(401).json({ message: '회원님의 댓글이 아닙니다.' })
    await Comment.protected.update([{ content }, commentId])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
