const Post = require('@models/posts')

// GET /prt/posts/:postId
module.exports = async (req, res, next) => {
  const { postId } = req.params

  try {
    const post = await Post.protected.findById(postId)
    let me = true
    let isDeleted = false
    if (post.userId !== req.user.uuid) me = false
    if (post.status === 4) isDeleted = true
    const payload = {
      title: post.title,
      content: post.content,
      occupation: post.occupation,
      boardType: post.boardType,
      me,
      isDeleted,
      korName: post.korName,
      occupationId: post.occupationId
    }
    res.status(200).json(payload)
  } catch (err) {
    next(err)
  }
}
