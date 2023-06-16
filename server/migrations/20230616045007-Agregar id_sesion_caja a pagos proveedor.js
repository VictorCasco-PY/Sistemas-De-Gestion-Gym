'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('pagos_proveedores', 'id_forma_de_pago', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'formas_de_pagos',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('pagos_proveedores', 'id_forma_de_pago');
  }
};
