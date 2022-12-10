"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class ContactList extends Model {
    static associate(models) {
      ContactList.belongsTo(models.User, { foreignKey: "user_id" });
      models.User.hasMany(ContactList, { foreignKey: "user_id" });
    }
  }
  ContactList.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "ContactList",
      tableName: "acontact_list",
    }
  );
  return ContactList;
};
