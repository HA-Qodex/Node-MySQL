"use strict";

var multer = require("multer");

var fileStorage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    try {
      cb(null, "./uploads");
    } catch (err) {
      console.log(err);
    }
  },
  filename: function filename(req, file, cb) {
    try {
      cb(null, "".concat(Date.now(), "-").concat(file.originalname));
    } catch (err) {
      console.log(err);
    }
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  var allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
}; // Initialize Multer


var fileUpload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  } // 5 MB limit

});
module.exports = fileUpload;