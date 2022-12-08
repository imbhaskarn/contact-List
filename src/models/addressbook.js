"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class addressBook extends Model {
    static associate(models) {
      addressBook.belongsTo(models.User, { foreignKey: "user_id" });
      models.User.hasMany(addressBook, { foreignKey: "user_id" });
    }
  }
  addressBook.init(
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
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "addressBook",
      tableName: "address_book",
    }
  );
  return addressBook;
};
