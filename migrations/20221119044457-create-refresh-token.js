'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Refresh_Tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Refresh_Tokens', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'refresh_tokens_fkey_user_id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Refresh_Tokens');
  }
};