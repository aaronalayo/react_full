const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "admin",
    {
      admin_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: "email",
      },
      password: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "admin",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "admin_id" }],
        },
        {
          name: "admin_id",
          unique: true,
          using: "BTREE",
          fields: [{ name: "admin_id" }],
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
      ],
    }
  );
};
