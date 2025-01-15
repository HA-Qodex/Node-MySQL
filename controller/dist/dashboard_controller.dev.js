"use strict";

var _require = require("../models"),
    User = _require.User;

var jwt = require("jsonwebtoken");

var fetchData = function fetchData(req, res) {
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.status(200).json({
            message: "Data fetched successfully",
            user: req.user
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  fetchData: fetchData
};