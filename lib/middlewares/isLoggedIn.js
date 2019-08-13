module.exports = (req, res, next) => {
  console.log('isLoggedIn: ', req.user)
  if (req.user) return next()

  res.status(401).json({ message: '로그인을 해주세요' })
}
