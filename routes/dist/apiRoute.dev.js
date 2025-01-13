"use strict";

var router = require("express").Router();

var _require = require("express-validator"),
    body = _require.body;

var multer = require("multer");

var userController = require("../controller/user_controller");

var upload = multer();
router.get("/login", function (req, res) {
  res.status(200).json({
    message: "Hello World"
  });
});
router.post("/register", upload.none(), [body("name").isLength({
  min: 3
}).withMessage("Invalid name"), body("email").isEmail().withMessage("Invalid email")], userController);
module.exports = router;