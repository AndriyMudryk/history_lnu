const mode = process.env.NODE_ENV || "development";
const appRootPath = "../";
const ecosystemConfig = require(appRootPath + "ecosystem.config");
const apps = ecosystemConfig.apps;
const appName = mode === "development" ? "lnu-backend-dev" : "lnu-app";
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

const config = {
  projectDir: __dirname,
  logDir: "log",
  tempDir: "temp",
  hostname: "0.0.0.0",
  mode: mode,
  gracefulShutdownTimeout: 5000,

  nuxtBuildDir: env.NUXT_BUILD_DIR,
  nuxtPort: parseInt(env.NUXT_PORT, 10),
  port: parseInt(env.PORT, 10),
  tokenNameHeader: env.TOKEN_NAME_HEADER,
  tokenNameCookie: env.TOKEN_NAME_COOKIE,

  ajaxRequestNameHeader: env.AJAX_REQUEST_NAME_HEADER,
  ajaxRequestValueHeader: env.AJAX_REQUEST_VALUE_HEADER,

  appVersionNameHeader: env.APP_VERSION_NAME_HEADER,
  appVersion: env.APP_VERSION,
  appRevision: env.APP_REVISION,
  appName: env.APP_NAME,
  jwtSecret: env.JWT_SECRET,
  jwtExpires: 60 * 60 * 6, // jwt lifetime in seconds (6H)

  //limitPerPage: 500,

  compressionOptions: {
    threshold: 0//Threshold in bytes for the response body size before compression (default 1024)
    //level: 0//No compression (default 6)
  },

  dbType: dbConfig.DB_TYPE,

  // DB connection pool config
  postgres: {
    database: dbConfig.DB_NAME,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    host: dbConfig.DB_HOST,
    port: parseInt(dbConfig.DB_PORT, 10),
    max: 100, // Max number of clients in the pool (limit of maximum 100 idle clients)
    idleTimeoutMillis: 60000, // How long a client is allowed to remain idle before being closed (keep idle connections open for a 30 seconds)
    acquire: 60000 // The maximum time, in milliseconds, that pool will try to get connection before throwing error
  }
};

module.exports = config;