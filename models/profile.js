'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    photo: DataTypes.TEXT,
    about: DataTypes.TEXT,
    talents: DataTypes.ARRAY,
    favorites: DataTypes.ARRAY,
    whyMe: DataTypes.TEXT,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    maritalStatus: DataTypes.STRING,
    height: DataTypes.INTEGER,
    bodyType: DataTypes.STRING,
    children: DataTypes.INTEGER,
    occupation: DataTypes.STRING,
    pets: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Profile;
};