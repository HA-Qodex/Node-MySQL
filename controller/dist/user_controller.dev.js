"use strict";

var _require = require("../models"),
    User = _require.User;

var bcrypt = require("bcrypt");

var registration = function registration(req, res) {
  var pass, user;
  return regeneratorRuntime.async(function registration$(_context) {
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

var login = function login(req, res) {
  var user, pass;
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              email: req.body.email
            }
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Password or email or both incorrect"
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 8:
          pass = _context2.sent;

          if (pass) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Password or email or both incorrect"
          }));

        case 11:
          res.status(200).json({
            message: "User login successfully",
            data: {
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address
            }
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json({
            message: _context2.t0.message
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports = {
  registration: registration,
  login: login
};