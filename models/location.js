'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define(
    'Location',
    {
      city: DataTypes.STRING,
      stateId: DataTypes.INTEGER,
      countryId: DataTypes.INTEGER,
      zip: DataTypes.STRING,
      distance: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function(models) {
          Location.hasMany(models.Profile, {
            foreignKey: 'locationId'
          });

          Location.belongsTo(models.State, {
            foreignKey: 'stateId'
          });

          Location.belongsTo(models.Country, {
            foreignKey: 'countryId'
          });
        }
      }
    }
  );
  return Location;
};
