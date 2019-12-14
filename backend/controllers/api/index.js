const express = require("express");

const rootPath = "../../";
const logger = require(rootPath + "helpers/logger");

const router = express.Router();

// Authorization middleware for secure access to this resources uri (check all logged in users jwt token)
router.use("/", require("./middlewares/authorization"));

// All authorized have access to the following routes. Further access is checked inside individual routes.
//router.use("/cascade", require("./cascade"));


router.get("*", function (req, res) {
  const message = "No service found";
  const statusCode = 404;

  res.status(statusCode);
  res.send({
    status: statusCode,
    message: message,
    type: "request"
  });
  logger.error("No api rest service found. Request url: " + req.originalUrl);
});

module.exports = router;