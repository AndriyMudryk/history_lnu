import axios from "axios";

import JSssr from "~/utils/JSssr";
import logger from "~/utils/logger";
import constants from "~/constants";
const APP_VERSION_NAME_HEADER = constants.APP_VERSION_NAME_HEADER;
//const APP_VERSION = constants.APP_VERSION;
const APP_REVISION = constants.APP_REVISION;
const AJAX_REQUEST_NAME_HEADER = constants.AJAX_REQUEST_NAME_HEADER;
const AJAX_REQUEST_VALUE_HEADER = constants.AJAX_REQUEST_VALUE_HEADER;


const instance = axios.create();

/*
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // Add coolie or authorization header
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
*/

function reloadPage(message, timeout) {
  if (process.server) {
    return false;
  }
  JSssr.showMessage(message, timeout - 100);
  setTimeout(
    function () {
      window.location.reload(true);
    },
    timeout
  );
}

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {

    // Force page reload when new application version detection
    if (process.browser) {
      const appVersionFromHeader = response.headers[APP_VERSION_NAME_HEADER];
      if (
        (appVersionFromHeader && appVersionFromHeader !== APP_REVISION) ||
        response.status === 205 // Reset content
      ) {
        const message = "New application version detected. Page will reload in 3 seconds.";
        reloadPage(message, 3000);
        return Promise.reject(message);//throw new Error(message);
      }
    }
    if (response && response.data) {
      return response.data;
    }
    return null;
  }, function (error) {
    const response = error.response || {};
    if (response.status === 502) {
      reloadPage("Deployment is currently in progress.", 3000);
      logger.error("Deployment is currently in progress", error);// Typically happens on server redeploy
    } else if (response.status === 403 && response.config.url.indexOf("/auth/getToken") === -1) {
      reloadPage("Re-authentication required. Redirecting back to login screen in 3 seconds.", 3000);
      logger.error("Re-authentication required", error);// Typically happens for token expiration (inactive sessions)
    } else {
      const errorMessage = error.config.errorMessage;
      if (errorMessage) {
        JSssr.showError(errorMessage, error);
      }
    }
    return Promise.reject(error);
  }
);

// Add application version to the headers
instance.setApplicationVersion = function (appVersionNameHeader, appRevision) {
  instance.defaults.headers.common[appVersionNameHeader] = appRevision;
};

// Extending with custom methods
instance.setAuthToken = function (tokenNameHeader, token) {
  instance.defaults.headers.common[tokenNameHeader] = token;
};

instance.resetAuthToken = function (tokenNameHeader) {
  delete instance.defaults.headers.common[tokenNameHeader];
};

instance.addXMLHttpRequestHeader = function () {
  instance.defaults.headers.common[AJAX_REQUEST_NAME_HEADER] = AJAX_REQUEST_VALUE_HEADER;
};

instance.setApplicationVersion(APP_VERSION_NAME_HEADER, APP_REVISION);

export default instance;