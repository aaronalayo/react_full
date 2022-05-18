const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('students', {
    student_id: {
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
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: false
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
    password_reset_code: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    program_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'programs',
        key: 'program_id'
      }
    }
  }, {
    sequelize,
    tableName: 'students',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
      {
        name: "student_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
      {
        name: "program_id",
        using: "BTREE",
        fields: [
          { name: "program_id" },
        ]
      },
    ]
  });
};
