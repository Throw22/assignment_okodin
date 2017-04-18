'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      locationId: {
        type: Sequelize.INTEGER
      },
      photo: {
        type: Sequelize.TEXT
      },
      about: {
        type: Sequelize.TEXT,
        validate: {
          notEmpty: {
            msg: 'About cannot be empty'
          }
        }
      },
      talents: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      favorites: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      whyMe: {
        type: Sequelize.TEXT,
        validate: {
          notEmpty: {
            msg: 'Why Me cannot be empty'
          }
        }
      },
      gender: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Gender cannot be empty'
          }
        }
      },
      age: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Age cannot be empty'
          },
          isInt: {
            msg: 'Age must be an integer'
          }
        }
      },
      maritalStatus: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.INTEGER
      },
      bodyType: {
        type: Sequelize.STRING
      },
      children: {
        type: Sequelize.INTEGER
      },
      occupation: {
        type: Sequelize.STRING
      },
      pets: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Profiles');
  }
};
