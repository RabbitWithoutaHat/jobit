const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './client/public/images',
  filename(req, file, cb) {
    cb(null, `IMAGE-${Date.now()}${path.extname(file.originalname)}`)
  },
})

module.exports = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single('myImage')
