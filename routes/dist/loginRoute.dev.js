"use strict";

var router = require('express').Router();

router.get('/', function (req, res) {
  res.status(200).json({
    'message': 'Hello World'
  });
});
module.exports = router;