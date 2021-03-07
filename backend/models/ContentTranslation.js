module.exports = (sequelize, Sequelize) => {
  const ContentTranslation = sequelize.define(
    "ContentTranslation",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      languageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      contentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
        attributes: { exclude: ["deletedAt"] },
      },
    }
  );
  ContentTranslation.associate = function (db) {
    ContentTranslation.belongsTo(db.Content, {
      as: "content",
      foreignKey: "contentId",
    });

    ContentTranslation.belongsTo(db.Language, {
      as: "language",
      foreignKey: "languageId",
    });
  };
  return ContentTranslation;
};
