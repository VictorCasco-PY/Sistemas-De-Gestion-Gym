'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('facturas', 'numero_factura', {
      type: Sequelize.STRING(200),
      allowNull: true
    });
  },

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('facturas', 'numero_factura', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }

  }
