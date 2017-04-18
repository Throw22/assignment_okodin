'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Username cannot be empty'
          },
          isAlphanumeric: {
            msg: 'Username must only be numbers and letters'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg: 'Must provide a valid email'
          },
          notEmpty: {
            msg: 'Email cannot be empty'
          }
        }
      },
      profileId: {
        type: Sequelize.INTEGER
      },
      lastLogin: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
