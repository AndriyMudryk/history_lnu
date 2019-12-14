import cookie from "cookie";

import axiosInstance from "~/utils/axiosInstance";
import logger from "~/utils/logger";
import constants from "~/constants";
const TOKEN_NAME_HEADER = constants.TOKEN_NAME_HEADER;
const TOKEN_NAME_COOKIE = constants.TOKEN_NAME_COOKIE;
const PORT = constants.PORT;
const NUXT_PORT = constants.NUXT_PORT;
const PUBLIC_APP_PORT = constants.PUBLIC_APP_PORT;

const state = () => ({
  apiEndpoint: null
});

const mutations = {
  setApiEndpoint(store, apiEndpoint) {
    store.apiEndpoint = apiEndpoint;
  }
};

const actions = {

  // Automatically called by nuxt server. Used to get user form client cookies and
  // check if user can be activated/loggedIn with this cookies
  nuxtServerInit({dispatch, commit}, context) {
    return new Promise((resolve) => {
      const headers = context.req.headers;
      const cookies = cookie.parse(headers.cookie || "");
      //console.log("nuxtServerInit fetch user using cookies");
      if (cookies.hasOwnProperty(TOKEN_NAME_COOKIE)) {
        axiosInstance.setAuthToken(TOKEN_NAME_HEADER, cookies[TOKEN_NAME_COOKIE]);
        dispatch("auth/fetch").then((/*userData*/) => {
          //console.log("[nuxtServerInit] fetched user: " + JSON.stringify(userData, null, 2));
          resolve(true);
        }).catch(error => {
          logger.error("nuxtServerInit", "Fetch user error", error);
          axiosInstance.resetAuthToken(TOKEN_NAME_HEADER);
          resolve(false);
        });
      } else {
        axiosInstance.resetAuthToken(TOKEN_NAME_HEADER);
        resolve(false);
      }
      let appPort = "";
      let appProtocol = "https";
      if (PUBLIC_APP_PORT === NUXT_PORT) {
        appPort = ":" + PORT;
        appProtocol = "http";
      }
      commit("setApiEndpoint", appProtocol + "://" + headers.host.split(":")[0] + appPort + "/rest/api/v1");
    });
  }
};

export default {
  state,
  mutations,
  actions
};