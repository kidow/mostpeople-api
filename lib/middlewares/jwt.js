const { encodeToken, decodeToken } = require('@lib/jwt')
const cookieOptions = require('@utils/cookieOptions')

module.exports = async (req, res, next) => {
  const token = req.cookies['access_token']
  if (!token) return next()

  try {
    const decoded = await decodeToken(token)
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const refreshToken = await encodeToken(decoded, 'user') // 차후에 email이 아닌 name으로
      res.cookie('access_token', refreshToken, cookieOptions)
    }
    req.user = decoded
  } catch (e) {
    req.user = null
  }

  next()
}
