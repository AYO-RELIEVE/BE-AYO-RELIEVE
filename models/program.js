'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    static associate(models) {
      Program.belongsTo(models.User, {
        foreignKey: 'organization_id',
        as: 'organization',
      });

      Program.belongsToMany(models.User, {
        through: 'Program_Users',
        as: 'applicant',
        foreignKey: 'program_id',
        onDelete: 'CASCADE',
      });
    }
  }
  Program.init({
    organization_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    rules: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    qouta: DataTypes.INTEGER,
    end_date: DataTypes.DATEONLY,
    announcement_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Program',
    tableName: 'programs'
  });
  return Program;
};