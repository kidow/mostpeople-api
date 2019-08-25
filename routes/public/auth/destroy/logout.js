// DELETE /auth/logout
module.exports = (req, res) => {
  req.logout()
  req.session.destroy()
  req.user = null
  res.cookie('access_token', '', { expires: new Date() })
  res.sendStatus(200)
}
