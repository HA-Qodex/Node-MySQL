'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        // queryInterface.addColumn(
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
        queryInterface.changeColumn(
          "Users",
          "email",
          {
            type: Sequelize.DataTypes.STRING,
            unique: true,
            allowNull: false
          },
          {
            transaction: t
          }
        )
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        "Users",
        "email",
        {
          type: Sequelize.DataTypes.STRING,
        }
      )
    ])
  }
};
