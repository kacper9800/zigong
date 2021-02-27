"use strict";
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("Product", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    coverImageId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    categoryId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  Product.associate = function (db) {
    Product.belongsTo(db.ProductsTranslation, {
      as: "productsTranslation",
      foreignKey: "id",
      onDelete: "cascade",
    });
    Product.belongsTo(db.File, {
      as: "file",
      foreignKey: "coverImageId",
    });
  };
  return Product;
};
