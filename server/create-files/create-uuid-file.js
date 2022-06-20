const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `server/static/uploads/`);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name_file = file.originalname.split('.').slice(0, -1).join('.');

    const filePath = `${uuid()}-${name_file}${ext}`;

    cb(null, filePath);
  }
});

const upload = multer({ storage });

module.exports = upload;
