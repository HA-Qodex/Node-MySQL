const { body, validationResult } = require("express-validator");
const {User} = require("../models");

function validationResponse(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
}

const userValidation = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Invalid email"),
  body("email").custom(async (value) => {
    var userEmail = await User.findOne({ where: { email: value } });
    if (userEmail) {
      return Promise.reject("Email already exists");
    }
    return true;
  }),
  body("phone")
    .optional()
    .matches(/^01/).withMessage("Invalid phone number")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone digit must be 11")
    .custom(async (value) => {
      var userPhone = await User.findOne({ where: { phone: value } });
      if (userPhone) {
        return Promise.reject("Phone already exists");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

module.exports = { validationResponse, userValidation };
