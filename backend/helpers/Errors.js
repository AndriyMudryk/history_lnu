const util = require("util");

const rootPath = "../";
const logger = require(rootPath + "helpers/logger");

// UnauthorizedError
function UnauthorizedError({code, error, message, debugMessage, toLog}) {
  const me = this;
  const constructor = me.constructor;
  Error.captureStackTrace(me, constructor);

  toLog = (typeof toLog === "boolean" && !toLog) ? false : true;

  me.name = constructor.name;
  me.message = message;

  logger.log(debugMessage);
  me.code = code;
  me.debugMessage = debugMessage;
  me.status = 403;// Forbidden
  // 401 Unauthorized: If the request already included authorization credentials, then the
  // 401 response indicates that authorization has been refused for those credentials.
  // 403 Forbidden: The server understood the request, but is refusing to fulfill
  me.inner = error;
  if (toLog) {
    logger.error("Type of error : " + me.name + ". Code: " + me.code + ". Status: " + me.status +
                  ".\nShort message: " + me.message + ". \nDebug message: " + me.debugMessage);
  }
}
util.inherits(UnauthorizedError, Error);



// ServerError
function ServerError({code, error, message, debugMessage}) {
  const me = this;
  const constructor = me.constructor;
  Error.captureStackTrace(me, constructor);
  me.name = constructor.name;
  me.message = message + (error ? " Message: " + error.message : "");
  me.debugMessage = debugMessage;
  me.code = code;
  me.status = 500;// Internal Server Error
  me.inner = error;
  logger.error("Type of error : " + me.name + ". Code: " + me.code + ". Status: " + me.status +
                ".\nShort message: " + me.message + ". \nDebug message: " + me.debugMessage);
}
util.inherits(ServerError, Error);

// ClientError
function ClientError({code, error, message, debugMessage}) {
  const me = this;
  const constructor = me.constructor;
  Error.captureStackTrace(me, constructor);
  me.name = constructor.name;
  me.message = message + (error ? " Message: " + error.message : "");
  me.debugMessage = debugMessage;
  me.code = code;
  me.status = 400;// Bad Request
  me.inner = error;
  logger.error("Type of error : " + me.name + ". Code: " + me.code + ". Status: " + me.status +
                ".\nShort message: " + me.message + ". \nDebug message: " + me.debugMessage);
}
util.inherits(ClientError, Error);

module.exports = {
  UnauthorizedError,
  ServerError,
  ClientError
};