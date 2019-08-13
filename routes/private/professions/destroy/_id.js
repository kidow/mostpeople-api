const Profession = require('@models/professions')

// DELETE /prv/professions/:id
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })
  if (req.user.status !== 2)
    return res.status(401).json({ message: '관리자 권한이 아닙니다.' })

  try {
    await Profession.private.destroy(req.params.id)
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
