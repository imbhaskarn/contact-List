import fs from "fs";
import path from "path";
import Sequelize, { DataTypes } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || "development";
import sequelizeConfig from "../config/sequelizeConfig.js";
const config = sequelizeConfig[env];




// import models from files

import userModel from './user.js'
import addressBookModel from "./addressbook.js";

// create sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    define: {
      timestamps: true,
      underscored: false,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

let models = {
    User: userModel(sequelize, DataTypes),
    AddressBook: addressBookModel(sequelize, DataTypes)  
};

Object.keys(models).forEach((modelName) => {
  if (typeof models[modelName].associate === "function") {
    models[modelName].associate(models);
  }
});
const db = {
  sequelize,
  Sequelize,
};
export const User = models.User
export const AddressBook = models.AddressBook
export default db;
