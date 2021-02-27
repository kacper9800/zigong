"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Contents",
      [
        {
          slug: "home-page",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          slug: "about-page",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          slug: "products-page",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          slug: "resources",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          slug: "contact-us",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
