module.exports = (sequelize, Sequelize) => {
  const Content = sequelize.define(
    "Content",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
    },
    {}
  );
  Content.associate = function (db) {
    Content.belongsTo(db.ContentTranslation, {
      as: "contentTranslation",
      foreignKey: "id",
      onDelete: "cascade",
    });
  };
  return Content;
};
