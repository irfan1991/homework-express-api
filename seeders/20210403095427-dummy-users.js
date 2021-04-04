const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      name: "Alexa",
      email:"alexa@gmail.com",
      password:bcrypt.hashSync('password',8),
      birthdate: "1991-12-09",
      phone: "(083)161-162",
      last_study: "SMA",
      institution: "SMA TARAKANITA",
      current_job: "student",
      place_birth : "Jakarta"

    }, 
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
