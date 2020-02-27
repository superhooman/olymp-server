const multer = require('multer');
const path = require("path");

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    const allowed = ['.png', '.jpg', '.gif', '.jpeg']
    if (allowed.indexOf(ext) < 0) {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  }
});

module.exports = upload