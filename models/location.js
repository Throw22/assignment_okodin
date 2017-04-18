'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    city: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER,
    zip: DataTypes.STRING,
    distance: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Location;
};