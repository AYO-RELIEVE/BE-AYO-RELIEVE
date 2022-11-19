'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrganizationDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  });
  return UserOrganizationDetail;
};