const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teachers', {
    teacher_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    google_id: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    verification_string: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    oauth_email: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'kea_departments',
        key: 'department_id'
      }
    }
  }, {
    sequelize,
    tableName: 'teachers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "teacher_id" },
        ]
      },
      {
        name: "teacher_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "teacher_id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "department_id",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
    ]
  });
};
