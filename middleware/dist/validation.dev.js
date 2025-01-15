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
var userUpdateValidation = [body("name").optional().isLength({
  min: 3
}).withMessage("Name must be at least 3 characters"), body("phone").optional().matches(/^01/).withMessage("Invalid phone number").isLength({
  min: 11,
  max: 11
}).withMessage("Phone digit must be 11").custom(function _callee3(value, _ref) {
  var req, userPhone;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          req = _ref.req;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              phone: value
            }
          }));

        case 3:
          userPhone = _context3.sent;

          if (!(userPhone && userPhone.id !== req.user.id)) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", Promise.reject("Phone already exists"));

        case 6:
          return _context3.abrupt("return", true);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}), body("password").optional().custom(function _callee4(value) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!value) {
            _context4.next = 3;
            break;
          }

          if (!(value.length < 6)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", Promise.reject("Password must be at least 6 characters"));

        case 3:
          return _context4.abrupt("return", true);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
})];
var loginValidation = [body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"), body("password").isLength({
  min: 6
}).withMessage("Password is required")];
module.exports = {
  validationResponse: validationResponse,
  registrationValidation: registrationValidation,
  loginValidation: loginValidation,
  userUpdateValidation: userUpdateValidation
};