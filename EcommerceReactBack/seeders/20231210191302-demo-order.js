'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        orderDate: new Date(),
        totalAmount: 49.99,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderDate: new Date(),
        totalAmount: 500,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Orders', null, {});

  }
};