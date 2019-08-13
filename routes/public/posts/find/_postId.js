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
        url: `/board/${post.occupationId}`,
        name: post.korName
      },
      {
        url: `/post/${post.uuid}`,
        name: post.title
      }
    ]
    await Post.update([{ viewCount: post.viewCount + 1 }, postId])
    const payload = {
      breadcrumbs,
      ...post,
      comments
    }
    res.status(200).json(payload)
  } catch (err) {
    next(err)
  }
}
