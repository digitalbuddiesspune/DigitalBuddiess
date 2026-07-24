import multer from 'multer'

function fileFilter(_req, file, cb) {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Only image uploads are allowed'))
    return
  }
  cb(null, true)
}

const storage = multer.memoryStorage()

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 },
})

export const uploadPortfolioMedia = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'galleryFiles', maxCount: 40 },
])
