import Rollbar from "rollbar";
import constants from "~/constants";

const NODE_ENV = constants.NODE_ENV;
const isEnabled = NODE_ENV !== "development";
const version = constants.APP_VERSION;
const revision = constants.APP_REVISION;
const codeVersion = version + "." + revision;

const rollbarConfig = {
  accessToken: constants.FRONTEND_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: NODE_ENV,
    username: "Unauthenticated user",// Should be filled after user login/logout
    appName: constants.APP_NAME,
    version: version,
    revision: revision,
    isServer: process.server,
    code_version: codeVersion,
    //host: "TODO",//TODO get real host
    client: {
      javascript: {
        code_version: codeVersion
      }
    }
  },
  enabled: isEnabled,
  //verbose: true, // This will now log to console.log, as well as Rollbar
  //logLevel: "debug",// Levels: ["critical", "error", "warning", "info", "debug"] used for calls to Rollbar.log(). Default: "debug"
  itemsPerMinute: 5, // Only send a max of 5 items to Rollbar per minute
  //endpoint: "https://api.rollbar.com/api/1/" // Default endpoint
  ignoredMessages: [
    //"New application version detected. Page will reload in 3 seconds.",
    //"Deployment is currently in progress."
  ],
  checkIgnore: function (/*isUncaught, args, payload*/) {
    // Code here to determine whether or not to send the payload
    // to the Rollbar API
    // return true to ignore the payload
    return false;
  }
};

// Temporary disable rollbar at all for development
// as it wraps js code and it is impossible to debug anything
/* eslint-disable no-console */
const instance = isEnabled ? new Rollbar(rollbarConfig) : {
  configure: () => {},
  error: console.error,// Call only $rollbar.error in the app
  log: console.log
};
/* eslint-enable no-console */

export default instance;