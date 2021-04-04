"use strict";
const { Model }= require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class join_classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, join_classes, classes }) {
      // define association here
      join_classes.belongsTo(users, {
        foreignKey: "users_id",
      });
      join_classes.belongsTo(classes, {
        foreignKey: "class_id",
      });
    }
  }
  join_classes.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
      },
      users_id: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      class_id: {
        type: DataTypes.UUID,
        references: {
          model: "classes",
          key: "id",
        },
      },
      role: {
       type: DataTypes.ENUM('student', 'tutor','spv'),
      },
    },
    {
      sequelize,
      modelName: "join_classes",
      timestamps: true,
      paranoid: true,
      tableName: 'join_classes',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
       deletedAt: 'deletedAt'
   
    }
  );
  return join_classes;
};

