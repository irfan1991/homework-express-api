"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class materials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ materials, schedules }) {
      // define association here
      materials.belongsTo(schedules, {
        foreignKey: "schedule_id",
      });
    }
  }
  materials.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
      },
      schedule_id: {
        type: DataTypes.UUID,
        references: {
          model: "schedules",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(100)
      },
       file: {
        type: DataTypes.TEXT('tiny')
      },
    },
    {
      sequelize,
      modelName: "materials",
      timestamps: true,
      paranoid: true,
      tableName: 'materials',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt'
    }
  );
  return materials;
};


