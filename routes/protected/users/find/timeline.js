const Post = require('@models/posts')
const Comment = require('@models/comments')

// GET /prt/users/timeline
module.exports = async (req, res, next) => {
  try {
    const [posts, comments] = await Promise.all([
      Post.protected.findTimeline(req.user.uuid),
      Comment.protected.findTimeline(req.user.uuid)
    ])
    res.status(200).json({ posts, comments })
  } catch (err) {
    next(err)
  }
}
