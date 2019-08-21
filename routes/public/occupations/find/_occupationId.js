const Occupation = require('@models/occupations')
const Post = require('@models/posts')

// GET /occupations/:occupationId
module.exports = async (req, res, next) => {
  const { occupationId } = req.params

  try {
    const [posts, occupation] = await Promise.all([
      Post.findByOccupationId(req.query, occupationId),
      Occupation.findById(occupationId)
    ])
    posts.forEach((post, i) => (post.key = `${i + 1}`))
    const payload = {
      posts,
      ...occupation,
      breadcrumbs: [
        {
          url: `/board/${occupation.uuid}`,
          name: `${occupation.korName}`
        }
      ]
    }
    res.status(200).json(payload)
  } catch (err) {
    next(err)
  }
}
