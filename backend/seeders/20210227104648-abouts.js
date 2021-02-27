'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        "Abouts",
        [
          {
            slug: "organization",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: "who-we-are",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: "our-facilities",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: "capabilities",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: "credentials",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: "quality-certification",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: "conflict-free-minerals",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
    );
  },

  down: (queryInterface, Sequelize) => {}
};
