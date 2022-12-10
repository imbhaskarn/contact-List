"use strict";
import { Model } from "sequelize";
import { DATE } from "sequelize/lib/data-types";
export default (sequelize, DataTypes) => {
  class AddressBook extends Model {
    static associate(models) {
      AddressBook.belongsTo(models.User, { foreignKey: "user_id" });
      models.User.hasMany(AddressBook, { foreignKey: "user_id" });
    }
  }
  AddressBook.init(
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      town_village: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "India",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        default: 
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "AddressBook",
      tableName: "address_book",
    }
  );
  return AddressBook;
};
