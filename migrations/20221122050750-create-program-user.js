'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Program_Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      program_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('Diterima', 'Ditolak', 'Menunggu'),
        defaultValue: 'Menunggu'
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

    await queryInterface.addConstraint('Program_Users', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'custom_fkey_user_id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
    });

    await queryInterface.addConstraint('Program_Users', {
      fields: ['program_id'],
      type: 'foreign key',
      name: 'custom_fkey_program_id',
      references: {
        table: 'Programs',
        field: 'id'
      },
      onDelete: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Program_Users');
  }
};