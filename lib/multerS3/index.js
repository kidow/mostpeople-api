const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require('../aws/s3')
const { NODE_ENV, AWS_S3_BUCKET, AWS_SANDBOX_S3_BUCKET } = process.env
const bucket = NODE_ENV === 'production' ? AWS_S3_BUCKET : AWS_SANDBOX_S3_BUCKET

const upload = multer({
  storage: multerS3({
    s3,
    bucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (_, file, cb) => cb(null, Date.now().toString(36))
  })
})

module.exports = upload
