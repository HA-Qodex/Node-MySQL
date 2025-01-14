const router = require("express").Router();
const multer = require("multer");
const userController = require("../controller/user_controller");
const validation = require("../middleware/validation");
const { registration, login } = require("../controller/user_controller");
const upload = multer();

router.post(
  "/login",
  upload.none(),
  validation.loginValidation,
  validation.validationResponse,
  login
);

router.post(
  "/register",
  upload.none(),
  validation.registrationValidation,
  validation.validationResponse,
  registration
);

module.exports = router;
