const Occupation = require('@models/occupations')

// GET /prv/occupations
module.exports = async (req, res, next) => {
  try {
    const [result, total] = await Promise.all([
      Occupation.private.find(req.query),
      Occupation.private.findTotal()
    ])
    res.status(200).json({ result, total })
  } catch (err) {
    next(err)
  }
}
