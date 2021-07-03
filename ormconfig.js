require("dotenv").config();

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    process.env.NODE_ENV == "development"
      ? "src/entity/**/*.ts"
      : "build/entity/**/*.js",
  ],
  migrations: [
    process.env.NODE_ENV == "development"
      ? "src/migration/**/*.ts"
      : "build/migration/**/*.js",
  ],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
  },
};
