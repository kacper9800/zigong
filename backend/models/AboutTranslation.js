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
          type: Sequelize.TEXT,
          get: function () {
            return JSON.parse(this.getDataValue('value'));
          },
          set: function (value) {
            this.setDataValue('value', JSON.stringify(value));
          },
        },
        languageId: {
          type: Sequelize.INTEGER
        },
        deleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
