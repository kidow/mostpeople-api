const Occupation = require('@models/occupations')
const Post = require('@models/posts')
const Intro = require('@models/introductions')

// GET /occupations/:occupationId
module.exports = async (req, res, next) => {
  const { occupationId } = req.params

  try {
    const [posts, occupation] = await Promise.all([
      Post.findByOccupationId(occupationId),
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
    console.log(payload)
    res.status(200).json(payload)
  } catch (err) {
    next(err)
  }
}
