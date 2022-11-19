'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Applicant_Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      date_of_birth: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      religion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      married: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      identity_card: {
        allowNull: false,
        type: Sequelize.STRING
      },
      profession: {
        allowNull: false,
        type: Sequelize.STRING
      },
      disability: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      proof_of_disability: {
        type: Sequelize.STRING
      },
      lsm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lsm_name: {
        type: Sequelize.STRING
      },
      lsm_membership: {
        type: Sequelize.STRING
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

    await queryInterface.addConstraint('User_Applicant_Details', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_applicant_detail_fkey_user_id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_Applicant_Details');
  }
};