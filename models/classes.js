"use strict";
const {  Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**,
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ classes, join_classes, schedules }) {
      // define association here
      classes.hasMany(schedules, { 
        foreignKey: "class_id",
      });
     classes.hasMany(join_classes, { 
        foreignKey: "class_id",
      });
      
    }
  }
  classes.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false
      },
      
      name: {
        type: DataTypes.STRING(50)
      },
      code: {
        type: DataTypes.CHAR(6)
      },
      date_start: {
        type: DataTypes.DATEONLY
      },
      date_end: {
        type: DataTypes.DATEONLY
      },
      description: {
        type: DataTypes.TEXT('tiny')
      },
      photo: {
        type: DataTypes.TEXT('tiny')
      },
    },
    {
      sequelize,
      modelName: "classes",
      timestamps: true,
       paranoid: true,
      tableName: 'classes',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt'
    }
  );
  return classes;
};









