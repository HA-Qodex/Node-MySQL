const router = require("express").Router();
const multer = require("multer");
const userController = require("../controller/user_controller");
const dashboardController = require("../controller/dashboard_controller");
const validation = require("../middleware/validation");
const authVerification = require("../middleware/authVerification");
const upload = multer();

router.post(
  "/login",
  upload.none(),
  validation.loginValidation,
  validation.validationResponse,
  userController.login
);

router.post(
  "/register",
  upload.none(),
  validation.registrationValidation,
  validation.validationResponse,
  userController.registration
);

router.get(
  "/dashboard",
  upload.none(),
  authVerification.verifyToken,
  dashboardController.fetchData
);

router.put(
  "/update-profile",
  upload.none(),
  authVerification.verifyToken,
  validation.userUpdateValidation,
  validation.validationResponse,
  userController.updateProfile
);

module.exports = router;
