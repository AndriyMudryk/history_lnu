import rollbarInstance from "~/utils/rollbarInstance";

function formatMessage(module, message) {
  return "[" + module + "] " + message;
}

const logger = {

  // // log methods exist for each level
  // rollbarInstance.critical("Crash while processing payment");
  // rollbarInstance.warning("Facebook API unavailable");
  // rollbarInstance.info("User logged in");
  // rollbarInstance.debug("Cron job starting");

  // // can pass arbitrary params
  // rollbarInstance.info("User logged in", {loginType: "email+password"});

  // // rich metadata will be included automatically, but if you want to override:
  // rollbarInstance.scope({person: {id: "123"}}).info("User logged in");

  /* eslint-disable no-console */
  log(module, message) {
    const printMessage = formatMessage(module, message);
    console.log(printMessage);
    rollbarInstance.log(printMessage);
  },

  error(module, message, error) {
    const errorMessage = error ? "\nMessage: " + error.message : "";
    const printMessage = formatMessage(module, message) + errorMessage;
    console.error(printMessage);
    //rollbarInstance.scope(error).error(printMessage);
    rollbarInstance.error(error);
  }
  /* eslint-enable no-console */
};

export default logger;