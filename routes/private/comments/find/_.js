const Comment = require('@models/comments')

// GET /prv/comments
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })
  if (req.user.status !== 2)
    return res.status(401).json({ message: '관리자 권한이 아닙니다.' })

  try {
    const [result, total] = await Promise.all([
      Comment.private.find(req.query),
      Comment.private.findTotal()
    ])
    res.status(200).json({ result, total })
  } catch (err) {
    next(err)
  }
}
