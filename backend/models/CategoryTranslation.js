module.exports = (sequelize, Sequelize) => {
  const CategoryTranslation = sequelize.define(
    "CategoryTranslations",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      homePageDescription: {
        type: Sequelize.STRING,
      },
      languageId: {
        type: Sequelize.INTEGER,
      },
    },
    {}
  );
  CategoryTranslation.associate = function (db) {
    CategoryTranslation.belongsTo(db.Category, {
      as: "category",
      foreignKey: "categoryId",
    });

    CategoryTranslation.belongsTo(db.Language, {
      as: "language",
      foreignKey: "languageId",
    });
  };

  return CategoryTranslation;
};
