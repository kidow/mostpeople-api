const Image = require('@models/images')
const multer = require('@lib/multerS3')

// POST /prt/images
module.exports = (req, res, next) => {
  const upload = multer.single('mostpeople')

  upload(req, res, async err => {
    if (err) return next(err)
    const { location, originalname } = req.file
    try {
      const injection = {
        url: location,
        alt: originalname,
        userId: req.user.uuid
      }
      const { insertId } = await Image.protected.create(injection)
      req.file.imageId = insertId
      res.status(200).json(req.file)
    } catch (err) {
      next(err)
    }
  })
}
