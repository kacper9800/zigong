module.exports = (sequelize, Sequelize) => {
  const AboutTranslations = sequelize.define(
      "AboutTranslations",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        aboutId: {
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.JSON,
        },
        languageId: {
          type: Sequelize.INTEGER
        }
      },
      {}
  );
  AboutTranslations.associate = function (db) {
    AboutTranslations.belongsTo(db.About, {
      as: "about",
      foreignKey: "aboutId",
    });

    AboutTranslations.belongsTo(db.Language, {
      as: "language",
      foreignKey: "languageId",
    });
  };

  return AboutTranslations;
};
