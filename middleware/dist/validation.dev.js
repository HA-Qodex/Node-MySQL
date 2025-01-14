"use strict";

var _require = require("express-validator"),
    body = _require.body,
    validationResult = _require.validationResult;

var _require2 = require("../models"),
    User = _require2.User;

function validationResponse(req, res, next) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(function (err) {
        return err.msg;
      })
    });
  }

  next();
}

var userValidation = [body("name").isLength({
  min: 3
}).withMessage("Invalid name"), body("email").isEmail().withMessage("Invalid email"), body("email").custom(function _callee(value) {
  var userEmail;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              email: value
            }
          }));

        case 2:
          userEmail = _context.sent;

          if (!userEmail) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", Promise.reject("Email already exists"));

        case 5:
          return _context.abrupt("return", true);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
})];
module.exports = {
  validationResponse: validationResponse,
  userValidation: userValidation
};