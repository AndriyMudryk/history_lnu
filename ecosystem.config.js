const packageJson = require(__dirname + "/package.json");

const env_shared = {
  TOKEN_NAME_HEADER: "Authorization",
  TOKEN_NAME_COOKIE: "token",
  AJAX_REQUEST_NAME_HEADER: "X-Requested-With",
  AJAX_REQUEST_VALUE_HEADER: "XMLHttpRequest",
  APP_VERSION_NAME_HEADER: "x-app-version",
  ROLLBAR_TOKEN: "",

  APP_VERSION: packageJson.version, // Version from package.json+ build number from version.json
  APP_NAME: packageJson.name,
  APP_DESCRIPTION: packageJson.description,

  // Only frontend configuration
  FRONTEND_ROLLBAR_TOKEN: "",

  // Only backend configuration
  BACKEND_ROLLBAR_TOKEN: "",
  ENCRYPTION_KEY: "KEY_FOR_ALL_DOORS"
};

const env_develop = Object.assign(
  {
    // Backend and frontend configuration (passed to nuxt.config.js)
    NODE_ENV: "development",
    PORT: 3131,
    NUXT_HOST: "0.0.0.0",// Used by staring nuxt server via nuxt.js script
    NUXT_PORT: 3132,// Used by staring nuxt server via nuxt.js script
    NUXT_BUILD_DIR: __dirname + "/build/nuxt-development",
    APP_NAME: env_shared.APP_NAME + "-develop",//overide app name
    PUBLIC_APP_PORT: 3132,

    // Only backend configuration

    //# Database connections
    DB_TYPE: "postgres",
    DB_HOST: "192.168.1.50",
    DB_PORT: 5432,
    DB_USER: "postgres",
    DB_PASSWORD: "postgres",
    DB_NAME: "lnu-app",

    JWT_SECRET: "xKjef7GNsBuhb2d%!e"
  },
  JSON.parse(JSON.stringify(env_shared))
);

const env_production = Object.assign(
  {
    // Backend and frontend configuration (passed to nuxt.config.js)
    NODE_ENV: "production",
    PORT: 3130,
    NUXT_HOST: "0.0.0.0",
    NUXT_PORT: 3130,
    NUXT_BUILD_DIR: __dirname + "/build/nuxt-production",
    PUBLIC_APP_PORT: 80,

    // Only frontend configuration
    FRONTEND_ROLLBAR_TOKEN: "a834237cc2eb46f6a18d6f2f44681bb7",

    // Only backend configuration
    BACKEND_ROLLBAR_TOKEN: "883f86786edf4a5cabc28ee6ee7531e0",

    //# Database connections
    DB_TYPE: "postgres",
    DB_HOST: "127.0.0.1",
    DB_PORT: 5432,
    DB_USER: "postgres",
    DB_PASSWORD: "postgres",
    DB_NAME: "lnu-app",

    JWT_SECRET: "YBdkvi9T59naGPE^!@r"
  },
  JSON.parse(JSON.stringify(env_shared))
);

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "lnu-frontend-dev",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "-c ./frontend/nuxt.config.js",
      env: env_develop,// Default when env parameter not specified
      env_develop: env_develop
    }, {
      name: "lnu-backend-dev",
      script: "./backend/index.js",
      env: env_develop,
      env_develop: env_develop,
      watch: ["backend"],
      ignore_watch: ["./backend/log/*"]
    }, {
      name: "lnu-app-build",
      autorestart: false,// One time run
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "build -c ./frontend/nuxt.config.js",
      env: env_production,
      env_production: env_production
    }, {
      name: "lnu-app",
      script: "./backend/index.js",
      args: "-c ./frontend/nuxt.config.js",
      env: env_production,
      env_production: env_production
    }
  ]
};