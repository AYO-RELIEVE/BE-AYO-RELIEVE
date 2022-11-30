const multer = require('multer')
const { generateSlug } = require('../utils/helpers')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, Math.floor(Math.random() * 999999999) + '-' + generateSlug(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(
            {
                message: 'Unsupported file format'
            },
            false
        )
    }
}

const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 3000000,
    },
    fileFilter: fileFilter
})

module.exports = uploadMiddleware