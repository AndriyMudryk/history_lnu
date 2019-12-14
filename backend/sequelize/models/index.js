const fs = require("fs");
const Sequelize = require("sequelize");

//BIGINT will be treated like a string
// (doing require('pg').defaults.parseInt8 = true outside of sequelize code works fine)
//require("pg").defaults.parseInt8 = true; // before requiresequelize
// How mssql dbtypes conerted into js types -> http://tediousjs.github.io/tedious/api-datatypes.html

const rootPath = "../../";
const config = require(rootPath + "config");
const logger = require(rootPath + "helpers/logger");

const db = {};
const sequelizeModelsDir = config.projectDir + "/sequelize/models";
const mode = config.mode;

function sequelizeOptions(dbConfig, dbDialect, poolConfig) {
  //https://github.com/mysqljs/mysql#connection-options

  let logging = false;
  if (mode === "development") {
    logging = function (message) {
      logger.debug("[Sequelize logs] " + message);
    };
  }

  return {
    //operatorsAliases: false,//Sequelize.Op,// To avoid warning
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    dialect: dbDialect, // the sql dialect of the database currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
    // you can also pass any dialect options to the underlying dialect library
    // - default is empty currently supported: 'mysql', 'postgres', 'mssql'
    dialectOptions: {
    //  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    //  supportBigNumbers: true,  //When dealing with big numbers (BIGINT and DECIMAL columns) in the database, you should enable this option (Default: false).
    //  bigNumberStrings: false,
    //  "ssl": false
      encrypt: true
    },
    // options: {
    //   encrypt: false
    // },
    //native: true,// a flag for using a native library or not. in the case of 'pg' -- set this to true will allow SSL support

    // pool configuration used to pool database connections
    pool: poolConfig,
    logging: logging
  };
}

const dbConfig = config[config.dbType];

const sequelize = new Sequelize(
  sequelizeOptions(
    dbConfig,
    config.dbType,
    {
      max: dbConfig.max,
      idle: dbConfig.idleTimeoutMillis,
      acquire: dbConfig.acquire
    }
  )
);

fs.readdirSync(sequelizeModelsDir).filter(
  function (file) {
    return file.indexOf(".") !== 0 &&
      file !== "index.js" &&
      file.slice(-3) === ".js";
  }
).forEach(
  function (file) {
    const model = sequelize.import(sequelizeModelsDir + "/" + file);
    db[model.name] = model;
  }
);

Object.keys(db).forEach(
  function (modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;