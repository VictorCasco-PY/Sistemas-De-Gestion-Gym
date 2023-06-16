'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('pagos_proveedores', 'id_sesion_caja', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sesiones_cajas',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('pagos_proveedores', 'id_sesion_caja');
  }
};
