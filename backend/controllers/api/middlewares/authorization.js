const express = require("express");

const rootPath = "../../../";
const User = require(rootPath + "services/User");
const {
  wrapPromiseErrorCatch
} = require(rootPath + "helpers/utils");

const router = express.Router();

router.use(
  wrapPromiseErrorCatch(
    function (req, res, next) {
      User.getUserJwt(req).then(
        function (payload) {
          req.payload = payload;
          next();
        }
      );
    }
  )
);

module.exports = router;