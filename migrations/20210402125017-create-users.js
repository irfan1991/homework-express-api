'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50)
      },
      place_birth: {
        type: Sequelize.STRING(50)
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      email: {
        type: Sequelize.STRING(100)
      },
       password: {
        type: Sequelize.TEXT
      },
      phone: {
        type: Sequelize.CHAR(12)
      },
      last_study: {
        type: Sequelize.STRING(20)
      },
      institution: {
        type: Sequelize.STRING(50)
      },
      current_job: {
        type: Sequelize.STRING(50)
      },
      sosmed: {
        type: Sequelize.STRING(100)
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
      },
      deletedAt: {
        type: Sequelize.DATE,      
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};