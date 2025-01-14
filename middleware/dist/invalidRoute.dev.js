"use strict";

var _require = require("body-parser"),
    json = _require.json;

var createError = require("http-errors");

function invalidRoute(req, res, next) {
  next(createError(404, "The route ".concat(req.method, " ").concat(req.originalUrl, " is invalid url")));
}

function errorHandler(err, req, res, next) {
  var status = err.status || 500;
  var message = err.message || "Internal Server Error";
  res.status(status).json({
    status: status,
    message: message
  });
}

module.exports = {
  invalidRoute: invalidRoute,
  errorHandler: errorHandler
};