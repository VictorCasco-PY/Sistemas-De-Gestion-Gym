'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('clientes', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('cajas', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('cobros', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('cobros_detalles', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('empleados', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('facturas', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('facturas_detalles', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('facturas_proveedores', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('facturas_proveedores_detalles', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('formas_de_pagos', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('mediciones_clientes', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('pagos_proveedores', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('planes_de_pagos', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('productos', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('proveedores', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('sesiones_cajas', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('timbrados', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('tipos_modalidades_de_pagos', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('transacciones', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    await queryInterface.addColumn('transacciones_detalles', 'activo', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('clientes', 'activo');
    await queryInterface.removeColumn('cajas', 'activo');
    await queryInterface.removeColumn('cobros', 'activo');
    await queryInterface.removeColumn('cobros_detalles', 'activo');
    await queryInterface.removeColumn('empleados', 'activo');
    await queryInterface.removeColumn('facturas', 'activo');
    await queryInterface.removeColumn('facturas_detalles', 'activo');
    await queryInterface.removeColumn('facturas_proveedores', 'activo');
    await queryInterface.removeColumn('facturas_proveedores_detalles', 'activo');
    await queryInterface.removeColumn('formas_de_pagos', 'activo');
    await queryInterface.removeColumn('mediciones_clientes', 'activo');
    await queryInterface.removeColumn('pagos_proveedores', 'activo');
    await queryInterface.removeColumn('planes_de_pagos', 'activo');
    await queryInterface.removeColumn('productos', 'activo');
    await queryInterface.removeColumn('proveedores', 'activo');
    await queryInterface.removeColumn('sesiones_cajas', 'activo');
    await queryInterface.removeColumn('timbrados', 'activo');
    await queryInterface.removeColumn('tipos_modalidades_de_pagos', 'activo');
    await queryInterface.removeColumn('transacciones', 'activo');
    await queryInterface.removeColumn('transacciones_detalles', 'activo');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
