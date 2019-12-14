const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT;

let API_BASE_URL = process.browser ? window.location.origin : "http://localhost:" + PORT;


// This change allow to create two separate servers for backend and frontend (for faster page compiling and reload).
if (NODE_ENV === "development") {
  if (process.browser) {
    const location = window.location;
    API_BASE_URL = location.protocol + "//" + location.hostname + ":" + PORT;
  }
}

/*
  Important process.env.NUXT_PORT and other params
  will be replaced during webpack compilation
  (configuration values are stored in nuxt.config.js)
*/

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  NUXT_HOST: process.env.NUXT_HOST,
  NUXT_PORT: process.env.NUXT_PORT,
  API_BASE_URL: API_BASE_URL,
  PUBLIC_APP_PORT: process.env.PUBLIC_APP_PORT,

  TOKEN_NAME_HEADER: process.env.TOKEN_NAME_HEADER,
  TOKEN_NAME_COOKIE: process.env.TOKEN_NAME_COOKIE,
  AJAX_REQUEST_NAME_HEADER: process.env.AJAX_REQUEST_NAME_HEADER,
  AJAX_REQUEST_VALUE_HEADER: process.env.AJAX_REQUEST_VALUE_HEADER,
  APP_VERSION_NAME_HEADER: process.env.APP_VERSION_NAME_HEADER,

  APP_VERSION: process.env.APP_VERSION,
  APP_REVISION: process.env.APP_REVISION,
  APP_NAME: process.env.APP_NAME,
  APP_DESCRIPTION: process.env.APP_DESCRIPTION,
  APP_HOMEPAGE: process.env.APP_HOMEPAGE,
  APP_REPOSITORY_URL: process.env.APP_REPOSITORY_URL,
  APP_BUILD_BRANCH: process.env.APP_BUILD_BRANCH,
  APP_BUILD: process.env.APP_BUILD,
  APP_ORGANIZATION: "FH",//?? TODO

  FRONTEND_ROLLBAR_TOKEN: process.env.FRONTEND_ROLLBAR_TOKEN,

  COOKIE_EXPIRE: {
    expires: 7
  }
};