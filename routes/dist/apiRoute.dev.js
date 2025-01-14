"use strict";

var router = require("express").Router();

var multer = require("multer");

var userController = require("../controller/user_controller");

var validation = require("../middleware/validation");

var upload = multer();
router.get("/login", function (req, res) {
  res.status(200).json({
    message: "Hello World"
  });
});
router.post("/register", upload.none(), validation.userValidation, validation.validationResponse, userController);
module.exports = router;