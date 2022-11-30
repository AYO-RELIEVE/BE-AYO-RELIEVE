"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Programs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      rules: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      thumbnail: {
        allowNull: true,
        type: Sequelize.STRING
      },
      qouta: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
      },
      announcement_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint("Programs", {
      fields: ["organization_id"],
      type: "foreign key",
      name: "programs_fkey_organization_id",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Programs");
  },
};
