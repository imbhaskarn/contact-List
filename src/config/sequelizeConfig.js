import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: "postgres",
    password: "123456",
    database: "postgres",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "password",
    database: "postgres",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
