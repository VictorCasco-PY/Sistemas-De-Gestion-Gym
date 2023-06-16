'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('pagos_proveedores', 'str_timbrado', {
      type: DataTypes.STRING(200),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('pagos_proveedores', 'str_timbrado');
  }
};
