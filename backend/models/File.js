module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define(
    "File",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      coverImage: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      fileName: {
        type: Sequelize.STRING,
      },
    },
    {}
  );
  File.associate = function (db) {};
  return File;
};
