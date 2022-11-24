'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserOrganizationDetail, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        as: 'user_organization_detail',
      });

      User.hasOne(models.UserApplicantDetail, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        as: 'user_applicant_detail',
      });

      User.hasMany(models.Program, {
        foreignKey: 'organization_id',
        onDelete: 'CASCADE',
        as: 'programs',
      });

      User.belongsToMany(models.Program, {
        through: 'Program_Users',
        as: 'program_users',
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.TEXT,
    photo: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    status: DataTypes.ENUM('organization', 'applicant')
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};