'use strict';
module.exports = function(sequelize, DataTypes) {
  var State = sequelize.define(
    'State',
    {
      longName: DataTypes.STRING,
      shortName: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          State.hasMany(models.Location, {
            foreignKey: 'state_id'
          });
        }
      }
    }
  );
  return State;
};
