"use strict";

var router = require("express").Router();

var multer = require("multer");

var userController = require("../controller/user_controller");

var validation = require("../middleware/validation");

var _require = require("../controller/user_controller"),
    registration = _require.registration,
    login = _require.login;

var upload = multer();
router.post("/login", upload.none(), validation.loginValidation, validation.validationResponse, login);
router.post("/register", upload.none(), validation.registrationValidation, validation.validationResponse, registration);
module.exports = router;