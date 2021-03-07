"use strict";
module.exports = (sequelize, Sequelize) => {
  const ProductsTranslation = sequelize.define(
    "ProductsTranslation",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      languageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      defaultScope: {
        attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
      },
    }
  );
  ProductsTranslation.associate = function (db) {
    ProductsTranslation.belongsTo(db.Product, {
      as: "product",
      foreignKey: "productId",
    });

    ProductsTranslation.belongsTo(db.Language, {
      as: "language",
      foreignKey: "languageId",
    });

    ProductsTranslation.belongsTo(db.Category, {
      as: "category",
      foreignKey: "categoryId",
    });
  };
  return ProductsTranslation;
};
