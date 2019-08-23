// GET /auth/me
module.exports = (req, res) => {
  if (!req.user) return res.json({ success: false })

  return res.json(req.user)
}
