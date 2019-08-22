const Occupation = require('@models/occupations')

// DELETE /prv/occupations/:id
module.exports = async (req, res, next) => {
  try {
    await Occupation.private.destroy(req.params.id)
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
