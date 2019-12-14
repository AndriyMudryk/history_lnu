import Vue from "vue";
import rollbarInstance from "~/utils/rollbarInstance";
import logger from "~/utils/logger";

const plugin = {
  install() {
    Vue.rollbar = rollbarInstance;
    Vue.prototype.$rollbar = rollbarInstance;
  }
};

Vue.use(plugin, {});

// Async Error Handling
Vue.config.errorHandler = function (error/*, vm, info*/) {
  // error - error message
  // vm - the exact component where the error occur
  // info - is error type v-on / lifecycle etc.
  logger.error("app", "Error catch", error);
  //logger.errorObject("app", "Error component:", vm);
  //logger.errorObject("app", "Error info:", info);
};

/*
export default ({ store }) => {
  const user = store.state.auth.user;
  if (user && user.login) {
    rollbarInstance.configure({
      payload: {
        username: user.login
      }
    });
  }
};
*/