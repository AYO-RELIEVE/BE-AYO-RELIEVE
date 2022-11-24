'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProgramUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProgramUser.init({
    user_id: DataTypes.INTEGER,
    program_id: DataTypes.INTEGER,
    status: DataTypes.ENUM('Diterima', 'Ditolak', 'Menunggu')
  }, {
    sequelize,
    modelName: 'ProgramUser',
    tableName: 'program_users'
  });
  return ProgramUser;
};