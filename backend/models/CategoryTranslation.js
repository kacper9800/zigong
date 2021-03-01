module.exports = (sequelize, Sequelize) => {
  const CategoryTranslation = sequelize.define("CategoryTranslations", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
<<<<<<< HEAD
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
=======
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.JSON,
    },
    homePageDescription: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    languageId: {
      allowNull: false,
>>>>>>> 88a8f501652c773ad6b6d9978377808f5ff92b5f
      type: Sequelize.INTEGER,
    },
  });
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
