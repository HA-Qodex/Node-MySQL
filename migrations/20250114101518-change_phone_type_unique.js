"use strict";

const { QueryInterface } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "Users",
          "phone",
          {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Users",
          "isActive",
          {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
