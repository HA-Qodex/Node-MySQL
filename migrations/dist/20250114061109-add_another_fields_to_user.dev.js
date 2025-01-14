'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", queryInterface.sequelize.transaction(function (t) {
              return Promise.all([// queryInterface.addColumn(
              //   "Users",
              //   "age",
              //   {
              //     type: Sequelize.DataTypes.INTEGER,
              //     allowNull: true
              //   },
              //   {
              //     transaction: t
              //   }
              // ),
              queryInterface.changeColumn("Users", "email", {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false
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
            return _context2.abrupt("return", Promise.all([queryInterface.changeColumn("Users", "email", {
              type: Sequelize.DataTypes.STRING
            })]));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};