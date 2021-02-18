module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define(
    "File",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mimetype: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {}
  );
  File.associate = function (db) {};
  return File;
};
