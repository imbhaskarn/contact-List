"use strict";

import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import Sequelize, { DataTypes } from "sequelize";
import { env as _env } from "process";
const basename = _basename(__filename);
const env = _env.NODE_ENV || "development";

import { sequelizeConfig as config } from "./models/config/sequelizeConfig";

const db = {};

const sequelize = new Sequelize(
  config[env.NODE_ENV].name,
  config[env.NODE_ENV].username,
  config[env.NODE_ENV].password,
  {
    host: config[env.NODE_ENV].host,
    port: config[env.NODE_ENV].port,
    dialect: config[env.NODE_ENV].dialect,
    define: {
      timestamps: true,
      underscored: true,
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

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
