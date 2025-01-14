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

var registrationValidation = [body("name").isLength({
  min: 3
}).withMessage("Name must be at least 3 characters"), body("email").isEmail().withMessage("Invalid email"), body("email").custom(function _callee(value) {
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
}), body("phone").optional().matches(/^01/).withMessage("Invalid phone number").isLength({
  min: 11,
  max: 11
}).withMessage("Phone digit must be 11").custom(function _callee2(value) {
  var userPhone;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              phone: value
            }
          }));

        case 2:
          userPhone = _context2.sent;

          if (!userPhone) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", Promise.reject("Phone already exists"));

        case 5:
          return _context2.abrupt("return", true);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}), body("password").isLength({
  min: 6
}).withMessage("Password must be at least 6 characters")];
var loginValidation = [body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"), body("password").isLength({
  min: 6
}).withMessage("Password is required")];
module.exports = {
  validationResponse: validationResponse,
  registrationValidation: registrationValidation,
  loginValidation: loginValidation
};