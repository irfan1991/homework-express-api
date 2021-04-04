"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class presences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ schedules, presences, join_classes }) {
      // define association here
      presences.belongsTo(schedules, {
        foreignKey: "schedule_id",
      });
      presences.belongsTo(join_classes, {
        foreignKey: "join_class_id",
      });
    }
  }
  presences.init(
    {
    
      schedule_id: {
        type: DataTypes.UUID,
        references: {
          model: "schedules",
          key: "id",
        },
      },
      join_class_id: {
        type: DataTypes.UUID,
        references: {
          model: "join_classes",
          key: "id",
        },
      },
      created_at: {
       type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "presences",
      timestamps: true,
      paranoid: true,
      tableName: 'presences',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
       deletedAt: 'deletedAt'
   
    },
    
  );
  presences.removeAttribute('id');
  return presences;
};

