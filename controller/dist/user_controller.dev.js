"use strict";

var _require = require("../models"),
    User = _require.User;

var bcrypt = require('bcrypt');

var userController = function userController(req, res) {
  var pass, user;
  return regeneratorRuntime.async(function userController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 3:
          pass = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            password: pass,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
          }));

        case 6:
          user = _context.sent;
          res.status(201).json({
            message: "User registered successfully",
            data: req.body
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            message: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = userController;