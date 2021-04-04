"use strict";
const { Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ schedules, classes, materials ,presences}) {
      // define association here
      schedules.hasMany(materials, { 
        foreignKey: "schedule_id",
      });
      schedules.hasMany(presences, { 
        foreignKey: "schedule_id",
      });
      schedules.belongsTo(classes, { foreignKey: "class_id" });
      
      
    }
  }
  schedules.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false
      },
      class_id: {
       type: DataTypes.UUID,
        references: {
          model: "classes",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(50)
      },
      code: {
        type: DataTypes.CHAR(6)
      },
      start: {
        type: DataTypes.DATE
      },
      end: {
        type: DataTypes.DATE
      },
    },
    {
      sequelize,
      modelName: "schedules",
      timestamps: true,
       paranoid: true,
      tableName: 'schedules',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt'
    }
  );
  return schedules;
};









