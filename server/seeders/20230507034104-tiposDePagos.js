'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('tipos_modalidades_de_pagos', [
            {str_nombre: 'diario', precio: 10000},
            {str_nombre: 'semanal', precio: 50000},
            {str_nombre: 'mensual', precio: 100000},
        ])

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('tipos_modalidades_de_pagos');
    }
};
