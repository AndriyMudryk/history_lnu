const cookie = require("cookie");// module loaded automatically by express
const fs = require("fs");
//const JSONStream = require("JSONStream");
//const FileReader = require("filereader");

const rootPath = "../";
const logger = require(rootPath + "helpers/logger");
const config = require(rootPath + "config");
//const validator = require(rootPath + "helpers/validators");

const tokenNameCookie = config.tokenNameCookie;
const tokenNameHeaderLowerCase = config.tokenNameHeader.toLowerCase();
const ajaxRequestNameHeaderLowerCase = config.ajaxRequestNameHeader.toLowerCase();
const ajaxRequestValueHeader = config.ajaxRequestValueHeader;

const wrapPromiseResponse = function (responseHandler) {
  return function (req, res) {
    try {
      responseHandler(req, res).then(
        function (result) {
          res.json(result);
        }
      ).catch(
        function (error) {
          sendClientError(res, error);
        }
      );
    } catch (responseHandlerError) {// Server code error here
      sendClientError(res, responseHandlerError);
    }
  };
};

const wrapPromiseErrorCatch = function (responseHandler) {
  return function (req, res, next) {
    try {
      responseHandler(req, res, next).catch(
        function (error) {
          sendClientError(res, error);
        }
      );
    } catch (responseHandlerError) {// Server code error here
      sendClientError(res, responseHandlerError);
    }
  };
};

const wrapPromiseNoContentResponse = function (responseHandler) {
  return function (req, res) {
    // try {
    responseHandler(req, res).then(
      function () {
        res.status(204);// No Content response status code in cases where the request was successful but has no content to return
        res.end();// No contend and empty body
      }
    ).catch(
      function (error) {
        sendClientError(res, error);
      }
    );
    // } catch (responseHandlerError) {// Server code error here
    //   sendClientError(res, responseHandlerError);
    // }
  };
};

const promisifyPipe = function (input, output) {
  return new Promise(
    function (resolve, reject) {
      let isOpen = true;
      function close() {
        if (isOpen) {
          isOpen = false;
          if (output.close) {
            output.close();
          }
          if (input.close) {
            input.close();
          }
          return true;
        }
        return false;
      }

      function successHandler() {
        close() && resolve();
      }

      function errorHandler(error) {
        close() && reject(error);
      }

      input.pipe(output);
      input.on("error", errorHandler);
      output.on("error", errorHandler);
      output.on("finish", successHandler);
      output.on("end", successHandler);
    }
  );
};

/*
function promisifyFileRead(readTypeObject) {
  return new Promise(
    function (resolve, reject) {
      const fileReader = new FileReader();
      fileReader.onload = resolve;
      fileReader.onerror = reject;
      const readType = readTypeObject.type;
      const readTypeData = readTypeObject.data;
      if (readType === "BinaryString") {
        fileReader.readAsBinaryString(readTypeData);
      } else if (readType === "ArrayBuffer") {
        fileReader.readAsArrayBuffer(readTypeData);
      }
    }
  );
}
*/

function sendClientError(res, error) {
  if (typeof error === "string") {
    error = {
      message: error
    };
  }
  error = error || {};
  const message = error.message || "No error message.";
  const name = error.name || "Error";
  const code = error.code || "no_code";
  const statusCode = error.status || 500;
  logger.error(name + ": - " + code + " - " + message, error);
  res.status(statusCode);
  const errorResponse = {
    name: name,
    message: message,
    code: code
  };

  // For form validation errors with field names
  if (error.errors) {
    errorResponse.errors = error.errors;
  }

  res.json(errorResponse);
}

function isNumber(number) {
  return typeof number === "number" && !isNaN(number);
}

function isStringNumber(numberStr) {
  return numberStr == Number(numberStr);
}

function getTokenFromRequest(request) {

  // Get token from header
  const headers = request.headers;
  if (headers.hasOwnProperty(tokenNameHeaderLowerCase)) {
    return headers[tokenNameHeaderLowerCase];
  }

  // Get token from cookies
  const cookies = cookie.parse(request.headers.cookie || "");
  if (cookies.hasOwnProperty(tokenNameCookie)) {
    return cookies[tokenNameCookie];
  }

  return null;
}

function getRequestRemoteAddress(req) {
  return String(
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.ip ||
    req._remoteAddress ||
    (req.connection && req.connection.remoteAddress)
  );
}

function isAjaxRequest(req) {
  const headers = req.headers;
  const accept = headers.accept;
  return headers[ajaxRequestNameHeaderLowerCase] === ajaxRequestValueHeader ||
    req.xhr ||
    (accept && accept.indexOf("json") !== -1);
}

function isEmptyObject(obj) {
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  //return Object.keys(obj).length === 0 && obj.constructor === Object;

  // fastest for an empty object
  for (let p in obj) {
    return false;
  }
  return true;
}

/*
function checkPaginationProperties(filter, limitPerPage) {
  let errors = {};
  if (typeof filter !== "object") {
    errors.customError = "Empty filter object.";
    return errors;
  }
  let errorMessage = validator.isNumber(filter.page, {min: 1});
  if (errorMessage !== null) {
    errors.page = errorMessage;
  }
  errorMessage = validator.isNumber(filter.perPage, {min: 1, max: limitPerPage});
  if (errorMessage !== null) {
    errors.perPage = errorMessage;
  }
  return errors;
}

function checkPaginationFilteringSortingProperties(filter, limitPerPage) {
  let errors = {};

  if (typeof filter !== "object") {
    errors.customError = "Empty filter object.";
    return errors;
  }
  errors = checkPaginationProperties(filter, limitPerPage);
  //let errorMessage = validator.isString(filter.search,, {required: true});
  //if (errorMessage === null) {
  //  errors.search = errorMessage;
  //}
  let errorMessage = validator.isString(filter.sortColumn, {required: true});
  if (errorMessage !== null) {
    errors.sortColumn = errorMessage;
  }
  errorMessage = validator.isString(filter.sortDirection, {required: true});
  if (errorMessage !== null) {
    errors.sortDirection = "This field is not a string.";
    if (filter.sortDirection !== "asc" && filter.sortDirection !== "desc") {
      errors.sortDirection = "This field can be only `asc` or `desc`.";
    }
    if (filter.sortColumn === "") {
      errors.sortColumn = "This field cannot be empty as `sortDirection` is available.";
    }
  } else {
    errorMessage = validator.isString(filter.sortColumn, {required: true});
    if (errorMessage !== null) {
      errors.sortDirection = "This field cannot be empty as `sortColumn` is available.";
    }
  }
  return errors;
}

function readJsonArrayDataFromFile(filePath) {
  logger.debug("[utils] Start reading json file `" + filePath + "`");
  const startTime = new Date();
  const jsonArray = [];
  const fileReadStream = fs.createReadStream(
    filePath,
    {
      flags: "r",
      encoding: "utf-8"
    }
  );
  const outputJsonStream = JSONStream.parse("*");
  outputJsonStream.on(
    "data",
    function (data) {
      jsonArray.push(data);
    }
  );
  return promisifyPipe(fileReadStream, outputJsonStream).then(
    function () {
      logger.debug("[utils] File processed. Json items count = " + jsonArray.length);
      logger.debug("[utils] File processed. Total time: " + (new Date() - startTime) / 1000 + " sec.");
      return jsonArray;
    }
  );
}
*/

function bulkInsert(queryInterface, table, rows, rowsPerBatch) {
  if (rows.length > 0) {

    // rows.splice will remove rowsPerBatch items from array and return remover
    return queryInterface.bulkInsert(table, rows.splice(0, rowsPerBatch)).then(
      function () {
        return bulkInsert(queryInterface, table, rows, rowsPerBatch);
      }
    );
  }
}

function createDirectory(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(
      directory,
      {
        recursive: true// NodeJS version 10 has added a native support for recursive folder creation
      }
    );
  }
}

module.exports = {
  wrapPromiseResponse: wrapPromiseResponse,
  wrapPromiseErrorCatch: wrapPromiseErrorCatch,
  wrapPromiseNoContentResponse: wrapPromiseNoContentResponse,
  sendClientError: sendClientError,
  isNumber: isNumber,
  getRequestRemoteAddress: getRequestRemoteAddress,
  isAjaxRequest: isAjaxRequest,
  isEmptyObject: isEmptyObject,
  getTokenFromRequest: getTokenFromRequest,
  //checkPaginationFilteringSortingProperties: checkPaginationFilteringSortingProperties,
  //readJsonArrayDataFromFile: readJsonArrayDataFromFile,
  bulkInsert: bulkInsert,
  createDirectory: createDirectory,

  isStringNumber: isStringNumber,
  promisifyPipe: promisifyPipe//,
  //promisifyFileRead: promisifyFileRead
};