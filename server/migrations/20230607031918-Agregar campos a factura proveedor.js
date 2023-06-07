'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * 
     */
    await queryInterface.addColumn('facturas_proveedores', 'str_ruc', {
      type: DataTypes.STRING(200),
      allowNull: true
    });
    await queryInterface.addColumn('facturas_proveedores', 'str_nombre', {
      type: DataTypes.STRING(200),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('facturas_proveedores', 'str_ruc');
    await queryInterface.removeColumn('facturas_proveedores', 'str_nombre');
  }
};
