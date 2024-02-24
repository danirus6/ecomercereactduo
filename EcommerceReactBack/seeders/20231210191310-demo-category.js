'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        categoryName: 'Hardware',
        description: 'Computers, PCs, Mac and video-consoles',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Electronics',
        description: 'TVs, Microwaves, Sound Systems and much more!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};