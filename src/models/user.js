'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */
    static associate(models) {
      // define association here
      this.hasMany(models.Purchase, { foreignKey: 'userId', as: 'purchases' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSaltSync();
        user.password = await bcrypt.hashSync(user.password, salt);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
