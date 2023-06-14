'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('cobros', 'id_factura', {
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
    return queryInterface.changeColumn('TableName', 'id_factura', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'facturas',
        key: 'id'
      }
    });
  },
};
