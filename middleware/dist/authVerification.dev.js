"use strict";

var _require = require("../models"),
    User = _require.User;

var jwt = require("jsonwebtoken");

var verifyToken = function verifyToken(req, res, next) {
  var authHeader = req.headers.authorization;
  var token = authHeader && authHeader.split(" ")[1];

  if (authHeader === undefined) {
    return res.status(401).json({
      message: "Unauthorized access"
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function _callee(err, tokenData) {
    var userData;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!err) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: "Invalid token"
            }));

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(User.findByPk(tokenData.id, {
              attributes: ["id", "name", "image", "email", "phone", "address"]
            }));

          case 4:
            userData = _context.sent;
            req.user = userData;
            next();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

module.exports = {
  verifyToken: verifyToken
};