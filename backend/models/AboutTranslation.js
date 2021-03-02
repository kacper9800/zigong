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
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      languageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
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