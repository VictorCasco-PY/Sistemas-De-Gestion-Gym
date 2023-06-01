'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('facturas_proveedores_detalles', 'id_stock')
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('facturas_proveedores_detalles', {id_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'stocks',
        key: 'id'
      }
    }} )
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
