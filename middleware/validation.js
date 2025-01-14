const { body, validationResult } = require("express-validator");
const { User } = require("../models");

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
  body("name").isLength({ min: 3 }).withMessage("Invalid name"),
  body("email").isEmail().withMessage("Invalid email"),
  body("email").custom(async (value) => {
    var userEmail = await User.findOne({ where: { email : value }});
    if (userEmail) {
      return Promise.reject("Email already exists");
    }
    return true;
  }),
];

module.exports = { validationResponse, userValidation };
