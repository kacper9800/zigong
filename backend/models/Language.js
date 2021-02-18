module.exports = (sequelize, Sequelize) => {
  const Language = sequelize.define(
    "Language",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Language.associate = function (db) {};

  Language.DEFAULT = "en";

  return Language;
};
