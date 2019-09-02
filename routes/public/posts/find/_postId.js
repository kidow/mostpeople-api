const Post = require('@models/posts')
const Comment = require('@models/comments')

// GET /posts/:postId
module.exports = async (req, res, next) => {
  const { postId } = req.params
  try {
    const [post, comments] = await Promise.all([
      Post.findById(postId),
      Comment.findByPostId(postId)
    ])
    const breadcrumbs = [
      {
        uuid: post.occupationId,
        name: post.korName,
        page: '/board/'
      },
      {
        uuid: postId,
        name: post.title,
        page: '/post/'
      }
    ]
    await Post.update([{ viewCount: post.viewCount + 1 }, postId])
    const payload = {
      breadcrumbs,
      post,
      comments
    }
    res.status(200).json(payload)
  } catch (err) {
    next(err)
  }
}
