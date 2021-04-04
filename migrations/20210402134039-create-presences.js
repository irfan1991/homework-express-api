'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('presences', {
    
      join_class_id: {
       type: Sequelize.UUID,
      },
      schedule_id: {
       type: Sequelize.UUID,
      },
      created_at: {
       type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('presences');
  }
};