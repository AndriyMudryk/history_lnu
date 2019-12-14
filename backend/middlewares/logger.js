const rootPath = "../";
const utils = require(rootPath + "helpers/utils");
const getRequestRemoteAddress = utils.getRequestRemoteAddress;

module.exports = {
  initLogger: function (server) {
    const morgan = require("morgan");
    const fs = require("fs");
    const rootPath = "./../";
    const config = require(rootPath + "config");
    const logDirectory = config.projectDir + "/" + config.logDir;

    // Ensure log directory exists (already checked in helpers/logger)
    utils.createDirectory(logDirectory);

    //https://github.com/expressjs/morgan/blob/master/index.js
    // combined - Standard Apache combined log output.
    //morgan.format("combined", ":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\"")

    // Get real ip if passed by apache, nginx
    morgan.token("remote-addr", function (req) {
      return getRequestRemoteAddress(req);
    });

    // Create a write stream (in append mode)
    server.use(
      morgan("combined", {
        stream: fs.createWriteStream(logDirectory + "/access.log", {
          flags: "a"
        })
      })
    );

    // Create a rotating write stream
    /*
    const FileStreamRotator = require("file-stream-rotator");
    server.use(morgan("combined", {
      stream: FileStreamRotator.getStream({
        filename: logDirectory + "/access-%DATE%.log",
        frequency: "daily",
        verbose: false
      })
    }));
    */
  }
};