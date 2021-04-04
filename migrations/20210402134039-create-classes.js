'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classes', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50)
      },
      code: {
        type: Sequelize.CHAR(6)
      },
      date_start: {
        type: Sequelize.DATEONLY
      },
      date_end: {
        type: Sequelize.DATEONLY
      },
      description: {
        type: Sequelize.TEXT('tiny')
      },
      photo: {
        type: Sequelize.TEXT('tiny')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
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
    await queryInterface.dropTable('classes');
  }
};