module.exports = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요' })
  if (req.user.status !== 2)
    return res.status(401).json({ message: '관리자 권한이 없습니다' })
  next()
}
