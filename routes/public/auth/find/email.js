const { decodeToken } = require('@lib/jwt')

// GET /auth/email
module.exports = async (req, res, next) => {
  const { email, providerId, emailVerified } = await decodeToken(
    req.cookies.profile_token
  )
  try {
    res.status(200).json({ email, providerId, emailVerified })
  } catch (err) {
    next(err)
  }
}
