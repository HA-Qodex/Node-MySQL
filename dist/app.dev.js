"use strict";

var express = require('express');

var router = require('./routes/apiRoute');

var bodyParser = require('body-parser');

var _require = require('./middleware/invalidRoute'),
    invalidRoute = _require.invalidRoute,
    errorHandler = _require.errorHandler;

require('dotenv').config();

var app = new express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', router);
app.use(invalidRoute);
app.use(errorHandler);
app.listen(process.env.PORT, function () {
  console.log("Server is running on port ".concat(process.env.PORT));
});