'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(125),
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(125),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(125),
        allowNull: false,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};