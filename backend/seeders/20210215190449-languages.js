"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Languages",
      [
        {
          code: "pl",
          name: "polish",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "en",
          name: "english",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "ru",
          name: "Russian",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
