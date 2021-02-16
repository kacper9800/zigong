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
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {}
  );
  Language.associate = function (db) {};

  Language.DEFAULT = "en";

  return Language;
};
