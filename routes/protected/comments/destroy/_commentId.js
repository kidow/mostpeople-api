const Comment = require('@models/comments')
const moment = require('moment')

// DELETE /prt/comments/:commentId
module.exports = async (req, res, next) => {
  const { commentId } = req.params

  try {
    const comment = await Comment.findById(commentId)
    if (comment.userId !== req.user.uuid)
      return res.status(401).json({ message: '회원님의 댓글이 아닙니다.' })
    await Comment.protected.update([
      { status: 4, deletedAt: moment().format('YYYY-MM-DD hh:mm:ss') },
      commentId
    ])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
