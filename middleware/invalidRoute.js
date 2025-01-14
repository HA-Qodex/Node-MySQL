const { json } = require("body-parser");
const createError = require("http-errors");

function invalidRoute(req, res, next) {
  next(
    createError(
      404,
      `The route ${req.method} ${req.originalUrl} is invalid url`
    )
  );
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    status: status,
    message: message,
  });
}

module.exports = { invalidRoute, errorHandler };
