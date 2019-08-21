// DELETE /auth/logout
module.exports = (req, res) => {
  req.logout()
  req.session.destroy()
  req.user = null
  res.cookie('access_token', '', {
    httpOnly: true,
    domain:
      process.env.NODE_ENV === 'production' ? '.mostpeople.kr' : 'localhost',
    path: '/',
    expires: new Date()
  })
  res.sendStatus(200)
}
