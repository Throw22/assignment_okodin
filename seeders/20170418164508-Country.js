'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    var countries = [];
    countries.push({ id: 1, name: 'United States' });

    return queryInterface.bulkInsert('Countries', countries);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Countries', null, {}, models.Country);
  }
};
