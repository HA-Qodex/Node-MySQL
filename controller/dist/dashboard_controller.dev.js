"use strict";

var fetchData = function fetchData(req, res) {
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req.user.image = req.user.image ? "".concat(req.protocol, "://").concat(req.get("host")).concat(req.baseUrl, "/").concat(req.user.image) : null;
          res.status(200).json({
            message: "Data fetched successfully",
            user: req.user
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  fetchData: fetchData
};