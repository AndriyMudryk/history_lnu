const appRootPath = "../../";
const apps = require(appRootPath + "ecosystem.config.js").apps;
//const logger = require(rootPath + "backend/helpers/logger");

const processArgs = process.argv;
let i = processArgs.length;
while (i--) {
  if (processArgs[i] === "--env") {
    break;
  }
}
const mode = processArgs[i + 1];
const appName = mode === "development" ? "fh-backend-dev" : "fh-app";
const app = apps.find(// utils.getArrayItem(apps, "name", appName);
  function (app) {
    if (app.name === appName) {
      return app;
    }
    return null;
  }
);

if (app === null) {
  throw new Error("App name" + appName + " not found in ecosystem.config");
}
const env = Object.assign(app.env, process.env);
const dbConfig = env;// to do selection via command parameters || env.PATIENT_DB; or if there will be separate DBs

module.exports = {
  development: {
    username: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
    host: dbConfig.DB_HOST,
    port: parseInt(dbConfig.DB_PORT, 10),
    dialect: dbConfig.DB_TYPE,
    dialectOptions: {
      encrypt: true,
      requestTimeout: 600000// 10 min
    },
    //logging: logger.info,
    pool: {
      max: 100,
      idle: 600000,
      acquire: 600000
    }
  },
  production: {
    username: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
    host: dbConfig.DB_HOST,
    port: parseInt(dbConfig.DB_PORT, 10),
    dialect: dbConfig.DB_TYPE,
    dialectOptions: {
      encrypt: true,
      requestTimeout: 600000// 10 min
    },
    //logging: logger.info,
    pool: {
      max: 100,
      idle: 600000,
      acquire: 600000
    }
  }
};