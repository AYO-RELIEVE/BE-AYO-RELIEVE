'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrganizationDetail extends Model {
    static associate(models) {
      UserOrganizationDetail.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }
  UserOrganizationDetail.init({
    user_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    sector: DataTypes.STRING,
    media_social: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserOrganizationDetail',
    tableName: 'User_Organization_Detail',
  });
  return UserOrganizationDetail;
};