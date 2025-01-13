const router = require("express").Router();
const { body } = require("express-validator");
const multer = require("multer");
const userController = require("../controller/user_controller");
const upload = multer();

router.get("/login", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

router.post(
  "/register",
  upload.none(),
  [
    body("name").isLength({ min: 3 }).withMessage("Invalid name"),
    body("email").isEmail().withMessage("Invalid email"),
  ],
  userController
);

module.exports = router;
