const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

      if (file.mimetype.startsWith('image/')) {
        cb(null, 'uploads/images');
      } else if (file.mimetype.startsWith('video/')) {
        cb(null, 'uploads/videos');
      } else {
        cb(null, 'uploads/files');
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
const upload = multer({
    storage: storage,
    limits: { fileSize: 150 * 1024 * 1024 }
});

module.exports = upload;