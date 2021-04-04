"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
   
    static associate({ users, join_classes }) {
      
     users.hasMany(join_classes, {
        foreignKey: "users_id",
      });
    }
  }
  users.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING(50)
      },
      place_birth: {
        type: DataTypes.STRING(50)
      },
      birthdate: {
        type: DataTypes.DATEONLY
      },
      email: {
        type: DataTypes.STRING(100)
      },
       password: {
        type: DataTypes.TEXT
      },
      phone: {
        type: DataTypes.CHAR(12)
      },
      last_study: {
        type: DataTypes.STRING(20)
      },
      institution: {
        type: DataTypes.STRING(50)
      },
      current_job: {
        type: DataTypes.STRING(50)
      },
      sosmed: {
        type: DataTypes.STRING(100)
      },
    },
    {
      sequelize,
      modelName: "users",
      timestamps: true,
      paranoid: true,
      tableName: 'users',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt'
    }
  );

  return users;
};

