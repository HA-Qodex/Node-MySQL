const router = require("express").Router();
const { body } = require("express-validator");
const multer = require("multer");
const userController = require("../controller/user_controller");
const validation = require("../middleware/validation");
const upload = multer();

router.get("/login", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

router.post(
  "/register",
  upload.none(),
  validation.userValidation,
  validation.validationResponse,
  userController
);

module.exports = router;
