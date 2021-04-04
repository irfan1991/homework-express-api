'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('materials', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      schedule_id: {
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING(100)
      },
       file: {
        type: Sequelize.TEXT('tiny')
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
    await queryInterface.dropTable('materials');
  }
};