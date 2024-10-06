const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

      if (file.mimetype.startsWith('image/')) {
        cb(null, 'uploads/images');
      } else if (file.mimetype.startsWith('video/')) {
        cb(null, 'uploads/videos');
      } else {
        cb(new Error('Unsupported file type'), false);
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({
    storage: storage,
    limits: { fileSize: 150 * 1024 * 1024 }
});

module.exports = upload;