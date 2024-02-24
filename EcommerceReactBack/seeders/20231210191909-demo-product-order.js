'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductsOrders', [
      {
        orderId: 2, // Ajusta según las órdenes existentes
        productId: 2, // Ajusta según los productos existentes
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductsOrders', null, {});
  }
}; 