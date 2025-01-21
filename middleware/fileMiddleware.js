const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    try{
        cb(null, "./uploads");
    }catch(err){
        console.log(err);
    }
  },
  filename: (req, file, cb) => {
    try{
        cb(null, `${Date.now()}-${file.originalname}`);
    }catch(err){
        console.log(err);

    }
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// Initialize Multer
const fileUpload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

module.exports = fileUpload;
