"use strict";

var _require = require("sequelize"),
    QueryInterface = _require.QueryInterface;
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", queryInterface.sequelize.transaction(function (t) {
              return Promise.all([queryInterface.changeColumn("Users", "phone", {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true
              }, {
                transaction: t
              }), queryInterface.addColumn("Users", "isActive", {
                type: Sequelize.BOOLEAN,
                defaultValue: true
              }, {
                transaction: t
              })]);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};