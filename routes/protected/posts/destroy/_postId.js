const Post = require('@models/posts')

// DELETE /prt/posts/:postId
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const { postId } = req.params
  const { userId } = req.query

  if (req.user.uuid !== userId)
    return res.status(401).json({ message: '권한이 없습니다.' })

  try {
    await Post.protected.update([
      { status: 4, deletedAt: moment().format('YYYY-MM-DD hh:mm:ss') },
      postId
    ])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
