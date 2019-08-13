module.exports = (req, res, next) => {
  if (!req.isAuthenticated)
    return res.status(401).json({ message: '로그인을 해주세요' })
  if (req.user.status !== 3)
    return res.status(401).json({ message: '관리자 권한이 없습니다' })

  next()
}
