"use strict";

var router = require("express").Router();

var multer = require("multer");

var userController = require("../controller/user_controller");

var dashboardController = require("../controller/dashboard_controller");

var validation = require("../middleware/validation");

var authVerification = require("../middleware/authVerification");

var fileUpload = require("../middleware/fileMiddleware");

var upload = multer();
router.post("/login", upload.none(), validation.loginValidation, validation.validationResponse, userController.login);
router.post("/register", upload.none(), validation.registrationValidation, validation.validationResponse, userController.registration);
router.get("/dashboard", // upload.none(),
authVerification.verifyToken, dashboardController.fetchData);
router.put("/update-profile", upload.none(), authVerification.verifyToken, validation.userUpdateValidation, validation.validationResponse, userController.updateProfile);
router.post('/update-profile-photo', fileUpload.single('image'), authVerification.verifyToken, userController.updateProfilePhoto);
router.get('/uploads/:filename', userController.showImage);
module.exports = router;