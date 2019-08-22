const Profession = require('@models/professions')

// DELETE /prv/professions/:id
module.exports = async (req, res, next) => {
  try {
    await Profession.private.destroy(req.params.id)
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
