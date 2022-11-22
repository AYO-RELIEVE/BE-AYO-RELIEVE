'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    static associate(models) {
      Program.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
    }
  }
  Program.init({
    organization_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
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
  });
  return Program;
};