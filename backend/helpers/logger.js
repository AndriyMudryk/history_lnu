/*global console*/
/* eslint-disable no-console */
const fs = require("fs");

const rootPath = "../";
const config = require(rootPath + "config");

const logDirectory = config.projectDir + "/" + config.logDir;
const mode = config.mode;
let rollbarInstance = null;

// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

function appendMessage(fileName, message) {
  fs.appendFileSync(logDirectory + "/" + fileName, message);
}

function getDate() {
  return new Date().toUTCString();
}

module.exports = {
  setRollbarInstance(rollbar) {
    // // reports a string message at the default severity level ("error")
    // rollbar.log("Timeout connecting to database");


    // // reports a string message at the specified level, along with a request and callback
    // // only the first param is required
    // rollbar.debug("Response time exceeded threshold of 1s", request, callback);
    // rollbar.info("Response time exceeded threshold of 1s", request, callback);
    // rollbar.warning("Response time exceeded threshold of 1s", request, callback);
    // rollbar.error("Response time exceeded threshold of 1s", request, callback);
    // rollbar.critical("Response time exceeded threshold of 1s", request, callback);

    // // reports a string message along with additional data conforming to the Rollbar API Schema
    // // documented here: https://rollbar.com/docs/api/items_post/
    // rollbar.warning(
    //   "Response time exceeded threshold of 1s",
    //   request,
    //   {
    //     threshold: 1,
    //     timeElapsed: 2.3
    //   }, callback
    // );

    rollbarInstance = rollbar;
    rollbarInstance.configure({
      payload: {
        client: {
          javascript: {
            code_version: process.env.APP_REVISION // Git SHA of your deployed code
          }
        },
        environment: process.env.NODE_ENV,
        server: {
          branch: process.env.APP_BUILD_BRANCH
        }
      }
    });
  },

  log(message) {
    const date = getDate();
    console.log("Log: " + date + " *** " + message);
    if (mode !== "development" && rollbarInstance !== null) {
      //rollbarInstance.log("Log: " + date + " *** " + message);
    }
    appendMessage("js.log", "Log: " + date + " *** " + message + "\n");
  },

  error(message, error) {
    const date = getDate();
    const errorMessage = error ? "\nMessage: " + error.message : "";
    console.error("Error: " + date + " *** " + message + errorMessage);
    if (error && error.stack) {
      console.error("Error stack: " + date + " *** ");
      console.error(error.stack);
    }
    if (mode !== "development" && rollbarInstance !== null) {
      rollbarInstance.error("Error: " + date + " *** " + message + errorMessage);
      //rollbarInstance.critical("Fatal error");// Todo fatal or critical error function and throw on process exit event
    }
    appendMessage("error.log", "Error: " + date + " *** " + message + errorMessage + "\n");
  },

  warning(message) {
    const date = getDate();
    console.log("Warning: " + date + " *** " + message);
    if (mode !== "development" && rollbarInstance !== null) {
      rollbarInstance.warning("Warning: " + date + " *** " + message);
    }
    appendMessage("warning.log", "Date: " + date + "; " + message + "\n");
  },

  info(message) {
    const date = getDate();
    console.info("Info: " + date + " *** " + message);
    if (mode !== "development" && rollbarInstance !== null) {
      rollbarInstance.info("Info: " + date + " *** " + message);
    }
    appendMessage("info.log", "Date: " + date + "; " + message + "\n");
  },

  trace(message) {
    const date = getDate();

    console.info("Trace: " + date + " *** " + message);
    appendMessage("trace.log", "Date: " + date + "; " + message + "\n");
  },

  debug(message) {
    const date = getDate();
    console.info("Debug: " + date + " *** " + message);
    if (mode !== "development" && rollbarInstance !== null) {
      rollbarInstance.debug("Debug: " + date + " *** " + message);
    }
    appendMessage("debug.log", "Date: " + date + "; " + message + "\n");
  }
};
/* eslint-enable no-console */