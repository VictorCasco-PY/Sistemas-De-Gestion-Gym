'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pagos_proveedores_detalles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      id_pago_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pagos_proveedores',
          key: 'id'
        }
      },
      id_forma_de_pago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'formas_de_pagos',
          key: 'id'
        }
      },
      monto: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pagos_proveedores_detalles');
  }
};
