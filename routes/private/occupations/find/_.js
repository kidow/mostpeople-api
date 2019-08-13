const Occupation = require('@models/occupations')

// GET /prv/occupations
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })
  if (req.user.status !== 2)
    return res.status(401).json({ message: '관리자 권한이 아닙니다.' })

  try {
    const [result, total] = await Promise.all([
      Occupation.private.find(req.query),
      Occupation.private.findTotal()
    ])
    res.status(200).json({ result, total })
  } catch (err) {
    next(err)
  }
}
