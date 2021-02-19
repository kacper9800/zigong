"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          slug: "powders",
          homePageCoverImageId: 7,
          coverImageId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          slug: "cemented-carbides",
          homePageCoverImageId: 9,
          coverImageId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          slug: "hardfacing-materials",
          homePageCoverImageId: 11,
          coverImageId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          slug: "w-mo-products",
          homePageCoverImageId: 13,
          coverImageId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          slug: "equipment-for-carbide-production",
          homePageCoverImageId: 15,
          coverImageId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
