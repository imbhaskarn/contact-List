"use strict";
import { Model, Sequelize } from "sequelize";

// create ContactList model mapped to contact_list table

export default (sequelize, DataTypes) => {
  class ContactList extends Model {
    static associate(models) {
      // define table relationships
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
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW()
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "ContactList",
      tableName: "contact_list",
    }
  );
  return ContactList;
};
