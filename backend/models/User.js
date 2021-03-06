module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
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
        attributes: {
          exclude: ["password", "dayOfBirth", "deletedAt"],
        },
      },
    }
  );

  User.associate = (db) => {
    User.belongsToMany(db.Role, {
      as: "Roles",
      through: "UserRoles",
      foreignKey: "userId",
      otherKey: "roleId",
      onDelete: "cascade",
    });
  };

  const Role = sequelize.import("./Role");

  User.prototype.isAdmin = async function () {
    const roles = await this.getRoles();

    return roles.some((role) => role.name === Role.ADMIN);
  };

  return User;
};
