'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    
    await queryInterface.addColumn('cobros', 'id_factura', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'facturas',
        key: 'id'
      }
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cobros', 'id_factura');
    await queryInterface.addConstraint('cobros', {
      fields: ['id_factura'],
      type: 'foreign key',
      name: 'cobros_ibfk_4',
      references: {
        table: 'facturas',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
     queryInterface.addColumn('cobros', 'id_factura', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'facturas_proveedores',
        key: 'id'
      }
    });
  },
};
