// GET /auth/me
module.exports = (req, res) => {
  if (!req.user) return res.json({ success: false })

  res.status(200).json(req.user)
}
