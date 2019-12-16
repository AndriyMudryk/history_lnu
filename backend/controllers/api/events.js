const express = require("express");
/*const bodyParser = require("body-parser");*/

const rootPath = "../../";
const Events = require(rootPath + "services/Events");
/*const urlencodedParser = bodyParser.urlencoded({extended: false});*/
const {
  wrapPromiseResponse/*,
  getRequestRemoteAddress*/
} = require(rootPath + "helpers/utils");

const router = express.Router();

router.get("/", wrapPromiseResponse(
  function (req) {
    const periodId = parseInt(req.query.periodId, 10);
    const search = req.query.search;

    return Events.getEvents(periodId, search);
  }
));

module.exports = router;