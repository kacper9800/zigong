module.exports = (sequelize, Sequelize) => {
  const About = sequelize.define(
    "About",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: {
        type: Sequelize.STRING,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
      },
    },
    {}
  );
  About.associate = function (db) {
    About.belongsTo(db.AboutTranslations, {
      as: "aboutTranslation",
      foreignKey: "id",
      onDelete: "cascade",
    });
  };

  return About;
};
