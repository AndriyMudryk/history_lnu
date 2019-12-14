const express = require("express");
const compression = require("compression");
const Rollbar = require("rollbar");
//const nuxt = require("nuxt");

const rootPath = "./";
const config = require(rootPath + "config");
const logger = require(rootPath + "helpers/logger");
const db = require(rootPath + "sequelize/models");

const rollbarInstance = new Rollbar({
  accessToken: config.backendRollbarToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  captureIp: true
});
logger.setRollbarInstance(rollbarInstance);
const app = express();

app.set("trust proxy", true);
app.set("etag", false);

// Switch off the default "X-Powered-By: Express" header
app.disable("x-powered-by");

// Compress all requests
app.use(compression(config.compressionOptions));

// Add X-Response-Time header to all responses
const mode = config.mode;
if (mode === "development") {
  logger.log("[index] X-Response-Time header added.");
  app.use(require("response-time")());
}

// Add request logger middleware
// Log every request to log/access.log file (ip, date, time, path, userAgent)
//if (mode === "development") {
logger.log("[index] Request logger middleware (ip, date, time, path, userAgent) added.");
require(rootPath + "middlewares/logger").initLogger(app);
//}

const port = config.port;
const nuxtPort = config.nuxtPort;
const isSinglePortMode = !nuxtPort || port === nuxtPort;

// Add CORS support for not single port mode
const tokenNameHeader = config.tokenNameHeader;
const appVersionNameHeader = config.appVersionNameHeader;
if (!isSinglePortMode) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, " + tokenNameHeader + ", " + appVersionNameHeader);
    res.header("Access-Control-Expose-Headers", appVersionNameHeader);
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });
}

// Add application version to the headers to be able to reload app on client side
//const appVersion = config.appVersion;
const appRevision = config.appRevision;
app.use((req, res, next) => {
  res.header(appVersionNameHeader, appRevision);
  const appRequestVersion = req.headers[appVersionNameHeader];
  if (appRequestVersion && appRequestVersion !== appRevision) {
    res.sendStatus(205);// Reset content status //equivalent to res.status(205).send("")
  } else {
    next();
  }
});

// Add HTTP routes support
app.use(require(rootPath + "/controllers/mainRoute"));

app.use(rollbarInstance.errorHandler());

(async function start() {
  // Following code just add Nuxt support for backend (frontend pages renderer)
  if (isSinglePortMode) {
    app.set("port", port);

    // Middlewares are imported here.
    //middlewares(app);

    // Import and set Nuxt.js options
    let configNuxt = require(rootPath + "../frontend/nuxt.config.js");
    configNuxt.dev = mode !== "production";
    configNuxt.buildDir = config.nuxtBuildDir;

    // Init Nuxt.js
    const nuxt = require("nuxt");
    const nuxtInstance = new nuxt.Nuxt(configNuxt);

    // Build only in dev mode
    if (configNuxt.dev) {
      await new nuxt.Builder(nuxtInstance).build();
      // TODO open page in dev mode
    } else {
      await nuxtInstance.ready();
    }

    // Give nuxt middleware to express
    app.use(nuxtInstance.render);
  }

  const hostname = config.hostname;
  const server = app.listen(
    port,
    hostname,
    function () {
      logger.log("[index] The server is running at " + hostname + ":" + port + "/ in " + mode + " mode.");
    }
  );

  function serverGracefulShutdownHandler() {
    logger.info("[index] Stopping server on port " + port);

    // Force shutdown timeout
    const gracefulTimeout = setTimeout(
      function () {
        logger.info("[index] Server on port " + port + " stopped forcefully.");
        process.exit(1);
      },
      config.gracefulShutdownTimeout
    );

    server.close(
      function (error) {
        if (error) {
          logger.error("[index] Problem with server graceful shutdown!", error);
        } else {
          logger.info("[index] Server on port " + port + " stopped gracefully.");
        }

        // Close db pool connections
        return db.sequelize.connectionManager.close().then(
          function () {
            logger.info("[index] All database pool connections are closed.");
            logger.info("[index] Application stopped gracefully.");
            clearTimeout(gracefulTimeout);
            process.exit(0);
          }
        ).catch(
          function (error) {
            logger.error("[index] Application did not stopped gracefully!", error);
            process.exit(1);
          }
        );
      }
    );
  }

  // Log process exit event
  process.on("exit", function (exitCode) {
    logger.info("[index] Process exit with code: " + exitCode);
  });

  process.on("SIGTERM", serverGracefulShutdownHandler);
  process.on("SIGINT", serverGracefulShutdownHandler);
  process.on("SIGHUP", serverGracefulShutdownHandler);
  process.on("message",
    function (msg) {
      if (msg === "shutdown") {
        serverGracefulShutdownHandler();
      }
    }
  );


  // Catch and log process errors and warnings
  process.on("unhandledRejection", function (error) {
    logger.error("[index] Unhandled Rejection", error);
    serverGracefulShutdownHandler();
    //process.exit(1);
  });

  process.on("unhandledException", function (error) {
    logger.error("[index] Unhandled Exception", error);
    serverGracefulShutdownHandler();
    //process.exit(1);
  });

  process.on("uncaughtException", function (error) {
    logger.error("[index] Uncaught Exception", error);
    serverGracefulShutdownHandler();
    //process.exit(1);
  });

  process.on("warning", function (error) {
    logger.warning("[index] Warning detected", error);
    serverGracefulShutdownHandler();
    //process.exit(1);
  });
}());