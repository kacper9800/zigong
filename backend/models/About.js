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
  About.associate = function (db) {
    About.belongsTo(db.AboutTranslations, {
      as: "aboutTranslation",
      foreignKey: "id",
      onDelete: "cascade",
    });
  };

  return About;
};
