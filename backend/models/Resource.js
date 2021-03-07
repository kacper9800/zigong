module.exports = (sequelize, Sequelize) => {
  const Resource = sequelize.define(
    "Resource",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      languageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.TEXT,
      },
      productId: {
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

  Resource.associate = function (db) {
    Resource.belongsTo(db.File, {
      as: "pdf",
      foreignKey: "file",
    });

    Resource.belongsTo(db.Category, {
      as: "category",
      foreignKey: "categoryId",
      onDelete: "cascade",
    });
  };

  return Resource;
};
