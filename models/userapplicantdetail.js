'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserApplicantDetail extends Model {
    static associate(models) {
      UserApplicantDetail.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }
  UserApplicantDetail.init({
    user_id: DataTypes.INTEGER,
    date_of_birth: DataTypes.DATEONLY,
    religion: DataTypes.STRING,
    married: DataTypes.BOOLEAN,
    identity_card: DataTypes.STRING,
    profession: DataTypes.STRING,
    disability: DataTypes.BOOLEAN,
    proof_of_disability: DataTypes.STRING,
    lsm: DataTypes.BOOLEAN,
    lsm_name: DataTypes.STRING,
    lsm_membership: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserApplicantDetail',
    tableName: 'user_applicant_details',
  });
  return UserApplicantDetail;
};