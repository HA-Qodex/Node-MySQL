"use strict";

var _require = require("../models"),
    User = _require.User;

var _require2 = require("express-validator"),
    validationResult = _require2.validationResult;

var userController = function userController(req, res) {
  var errors, user;
  return regeneratorRuntime.async(function userController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(res);
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array().map(function (err) {
              return err.msg;
            })
          }));

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            email: req.body.email
          }));

        case 7:
          user = _context.sent;
          res.status(201).json({
            message: "Data received successfully",
            data: user
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          res.status(400).json({
            message: _context.t0.message
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
};

module.exports = userController;