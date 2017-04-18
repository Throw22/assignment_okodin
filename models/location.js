'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define(
    'Location',
    {
      city: DataTypes.STRING,
      state_id: DataTypes.INTEGER,
      country_id: DataTypes.INTEGER,
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
            foreignKey: 'state_id'
          });

          Location.belongsTo(models.Country, {
            foreignKey: 'country_id'
          });
        }
      }
    }
  );
  return Location;
};
