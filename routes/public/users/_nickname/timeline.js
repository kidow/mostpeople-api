const Post = require('@models/posts')
const Comment = require('@models/comments')

module.exports = async (req, res, next) => {
  const { nickname } = req.params
  try {
    const [posts, comments] = await Promise.all([
      Post.findTimeline(nickname),
      Comment.findTimeline(nickname)
    ])
    res.status(200).json({ posts, comments })
  } catch (err) {
    next(err)
  }
}
