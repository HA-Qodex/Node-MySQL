"use strict";

var _require = require("../models"),
    User = _require.User;

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var path = require("path");

var fs = require("fs");

var XLSX = require('xlsx');

var _require2 = require("console"),
    log = _require2.log;

require("dotenv").config();

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
  var user, pass, access_token, refresh_token;
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
          access_token = jwt.sign({
            id: user.id,
            email: user.email
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_VALIDITY
          });
          refresh_token = jwt.sign({
            id: user.id,
            email: user.email
          }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_VALIDITY
          });
          res.status(200).json({
            message: "User login successfully",
            data: {
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address,
              access_token: {
                token: access_token,
                expires_in: process.env.ACCESS_TOKEN_VALIDITY
              },
              refresh_token: {
                token: refresh_token,
                expires_in: process.env.REFRESH_TOKEN_VALIDITY
              }
            }
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json({
            message: _context2.t0.message
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var addUsers = function addUsers(req, res) {
  var workbook, sheetName, sheet, data, i, user, pass, users;
  return regeneratorRuntime.async(function addUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          if (req.file) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'No file uploaded'
          }));

        case 3:
          // Read the file buffer using xlsx
          workbook = XLSX.read(req.file.buffer, {
            type: 'buffer'
          }); // Get the first sheet

          sheetName = workbook.SheetNames[0];
          sheet = workbook.Sheets[sheetName]; // Parse the sheet to JSON

          data = XLSX.utils.sheet_to_json(sheet);
          i = 0;

        case 8:
          if (!(i < data.length)) {
            _context3.next = 18;
            break;
          }

          user = data[i];
          _context3.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password.toString(), 10));

        case 12:
          pass = _context3.sent;
          user.password = pass;
          data[i] = user;

        case 15:
          i++;
          _context3.next = 8;
          break;

        case 18:
          _context3.next = 20;
          return regeneratorRuntime.awrap(User.bulkCreate(data));

        case 20:
          users = _context3.sent;
          res.status(200).json(users);
          _context3.next = 28;
          break;

        case 24:
          _context3.prev = 24;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Error reading the Excel file'
          });

        case 28:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 24]]);
};

var updateProfile = function updateProfile(req, res) {
  var userData, _req$body, name, phone, address, password, pass;

  return regeneratorRuntime.async(function updateProfile$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userData = {};
          _req$body = req.body, name = _req$body.name, phone = _req$body.phone, address = _req$body.address, password = _req$body.password;
          if (name) userData.name = name;
          if (phone) userData.phone = phone;
          if (address) userData.address = address;

          if (!password) {
            _context4.next = 10;
            break;
          }

          _context4.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 8:
          pass = _context4.sent;
          userData.password = pass;

        case 10:
          if (!(Object.keys(userData).length === 0)) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: "No data to update"
          }));

        case 12:
          _context4.next = 14;
          return regeneratorRuntime.awrap(User.update(userData, {
            where: {
              id: req.user.id
            }
          }));

        case 14:
          res.status(200).json({
            message: "User updated successfully"
          });

          try {} catch (err) {
            res.status(400).json({
              message: err.message
            });
          }

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var updateProfilePhoto = function updateProfilePhoto(req, res) {
  return regeneratorRuntime.async(function updateProfilePhoto$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.update({
            image: req.file.path
          }, {
            where: {
              id: req.user.id
            }
          }));

        case 3:
          res.status(200).json({
            message: "Image uploaded successfully"
          });
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            message: _context5.t0.message
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var showImage = function showImage(req, res) {
  var filename, filepath;
  return regeneratorRuntime.async(function showImage$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          try {
            filename = req.params.filename;
            filepath = path.join(__dirname, "../uploads", filename); // Check if the file exists

            if (fs.existsSync(filepath)) {
              res.sendFile(filepath);
            } else {
              res.status(404).json({
                message: "File not found"
              });
            }
          } catch (err) {
            res.status(400).json({
              message: err.message
            });
          }

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

module.exports = {
  registration: registration,
  login: login,
  addUsers: addUsers,
  updateProfile: updateProfile,
  updateProfilePhoto: updateProfilePhoto,
  showImage: showImage
};