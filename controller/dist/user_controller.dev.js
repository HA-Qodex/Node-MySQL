"use strict";

var _require = require("../models"),
    User = _require.User;

var userController = function userController(req, res) {
  var user;
  return regeneratorRuntime.async(function userController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            email: req.body.email
          }));

        case 3:
          user = _context.sent;
          res.status(201).json({
            message: "Data received successfully",
            data: user
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = userController;