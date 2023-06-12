'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('cobros_detalles', 'id_forma_de_pago', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'formas_de_pagos',
        key: 'id'
      }
    });
    await queryInterface.addColumn('cobros', 'id_sesion_caja', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sesiones_cajas',
        key: 'id'
      }
    });
    await queryInterface.addColumn('cobros', 'total', {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0.0
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cobros_detalles', 'id_forma_de_pago');
    await queryInterface.removeColumn('cobros', 'id_sesion_caja');
    await queryInterface.removeColumn('cobros', 'total');


  }
};
