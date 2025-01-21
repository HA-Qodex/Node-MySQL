const multer = require("multer");
const path = require("path");


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    // Check if the file has a .xls or .xlsx extension
    if (ext !== '.xls' && ext !== '.xlsx') {
      return cb(new Error('Only .xls and .xlsx files are allowed'));
    }
    cb(null, true);
  };

const docUpload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = docUpload;