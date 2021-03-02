module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("Category", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: Sequelize.STRING,
    },
    homePageCoverImageId: {
      type: Sequelize.INTEGER,
    },
    coverImageId: {
      type: Sequelize.INTEGER,
    },
  });
  Category.associate = function (db) {
    Category.hasMany(db.Resource, {
      as: "resource",
      foreignKey: "categoryId",
    });

    Category.hasOne(db.CategoryTranslations, {
      as: "categoryTranslation",
      foreignKey: "categoryId",
    });

    Category.belongsTo(db.File, {
      as: "homePageCoverImage",
      foreignKey: "homePageCoverImageId",
    });

    Category.belongsTo(db.File, {
      as: "coverImage",
      foreignKey: "coverImageId",
    });
  };

  return Category;
};
