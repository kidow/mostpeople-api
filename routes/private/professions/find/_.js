const Profession = require('@models/professions')

// GET /prv/professions
module.exports = async (req, res, next) => {
  try {
    const [result, total] = await Promise.all([
      Profession.private.find(req.query),
      Profession.private.findTotal()
    ])
    res.status(200).json({ result, total })
  } catch (err) {
    next(err)
  }
}
