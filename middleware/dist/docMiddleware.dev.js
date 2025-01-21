"use strict";

var multer = require("multer");

var path = require("path");

var storage = multer.memoryStorage();

var fileFilter = function fileFilter(req, file, cb) {
  var ext = path.extname(file.originalname); // Check if the file has a .xls or .xlsx extension

  if (ext !== '.xls' && ext !== '.xlsx') {
    return cb(new Error('Only .xls and .xlsx files are allowed'));
  }

  cb(null, true);
};

var docUpload = multer({
  storage: storage,
  fileFilter: fileFilter
});
module.exports = docUpload;