'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define(
    'Profile',
    {
      userId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
      photo: DataTypes.TEXT,
      about: DataTypes.TEXT,
      talents: DataTypes.ARRAY(DataTypes.TEXT),
      favorites: DataTypes.ARRAY(DataTypes.TEXT),
      whyMe: DataTypes.TEXT,
      gender: DataTypes.STRING,
      age: DataTypes.INTEGER,
      maritalStatus: DataTypes.STRING,
      height: DataTypes.INTEGER,
      bodyType: DataTypes.STRING,
      children: DataTypes.INTEGER,
      occupation: DataTypes.STRING,
      pets: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          Profile.hasOne(models.User, {
            foreignKey: 'profileId'
          });

          Profile.belongsTo(models.Location, {
            foreignKey: 'locationId'
          });
        }
      }
    }
  );
  return Profile;
};
