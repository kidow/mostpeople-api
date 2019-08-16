const Occupation = require('@models/occupations')
const Post = require('@models/posts')

// GET /
module.exports = async (_, res, next) => {
  try {
    const [posts, professions, newProfessions] = await Promise.all([
      Post.findPopular({}),
      Occupation.findByGroup({}),
      Occupation.findByGroupByNew({})
    ])
    posts.forEach((post, i) => (post.key = `${i + 1}`))
    if (newProfessions) professions.unshift(newProfessions)
    professions.forEach(profession => {
      const u = profession.uuid ? profession.uuid.split(',') : []
      const n = profession.korName ? profession.korName.split(',') : []
      profession.occupations = []
      u.forEach((v, i) => {
        let temp = {}
        temp.uuid = u[i]
        temp.korName = n[i]
        profession.occupations.push(temp)
        return
      })
      delete profession.uuid
      delete profession.korName
    })
    res.status(200).json({ posts, professions })
  } catch (err) {
    next(err)
  }
}
