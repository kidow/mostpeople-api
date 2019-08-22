const Profession = require('@models/professions')

// GET /prv/professions/:id
module.exports = async (req, res, next) => {
  try {
    const result = await Profession.private.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
