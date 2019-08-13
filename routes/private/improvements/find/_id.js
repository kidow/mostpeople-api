const Improvement = require('@models/improvements')

// GET /prv/improvements/:id
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })
  if (req.user.status !== 2)
    return res.status(401).json({ message: '권한이 없습니다.' })

  try {
    const result = await Improvement.private.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
