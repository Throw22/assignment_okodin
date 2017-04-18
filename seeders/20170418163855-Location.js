'use strict';
var faker = require('faker');
module.exports = {
  up: function(queryInterface, Sequelize) {
    var locations = [];
    for (let i = 1; i < 101; i++) {
      locations.push({
        city: faker.address.city(),
        stateId: Math.floor(Math.random() * 50) + 1,
        countryId: 1,
        zip: faker.address.zipCode(),
        distance: Math.floor(Math.random() * 100) + 1
      });
    }
    return queryInterface.bulkInsert('Locations', locations);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Locations', null, {}, models.Location);
  }
};
