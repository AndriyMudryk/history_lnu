import cookies from "js-cookie";

import api from "~/api";
import axiosInstance from "~/utils/axiosInstance";
import logger from "~/utils/logger";
import constants from "~/constants";
const TOKEN_NAME_HEADER = constants.TOKEN_NAME_HEADER;
const TOKEN_NAME_COOKIE = constants.TOKEN_NAME_COOKIE;
const COOKIE_EXPIRE = constants.COOKIE_EXPIRE;

const state = () => ({
  user: null,
  redirectUrl: null
});

const mutations = {
  setUser(store, data) {
    store.user = data;
  },

  resetUser(store) {
    store.user = null;
  },

  setRedirectUrl(store, redirectUrl) {
    store.redirectUrl = redirectUrl;
  }
};

const actions = {
  fetch({commit}) {
    return api.auth.me().then(
      function (userData) {
        commit("setUser", userData);
        return userData;
      }
    ).catch(
      function (error) {
        logger.error("auth", "Fetch /me data error: " + JSON.stringify(error, null, 2));
        commit("resetUser");
        return error;
      }
    );
  },

  login({commit, dispatch}, data) {
    return api.auth.login(data).then(
      function (responseData) {
        const jwt = responseData.jwt;
        axiosInstance.setAuthToken(TOKEN_NAME_HEADER, jwt);
        cookies.set(TOKEN_NAME_COOKIE, jwt, COOKIE_EXPIRE);
        commit("setRedirectUrl", responseData.redirectUrl);
        return dispatch("fetch");// or return dispatch("auth/fetch", null, { root: true });
      }
    );
  },

  logout({commit}) {
    commit("resetUser");
    axiosInstance.resetAuthToken(TOKEN_NAME_HEADER);
    cookies.remove(TOKEN_NAME_COOKIE);
    return Promise.resolve();
  }
};

export default {
  state,
  mutations,
  actions
};