const express = require("express");
/*const bodyParser = require("body-parser");*/

const rootPath = "../../";
const Period = require(rootPath + "services/Period");
/*const urlencodedParser = bodyParser.urlencoded({extended: false});*/
const {
  wrapPromiseResponse/*,
  getRequestRemoteAddress*/
} = require(rootPath + "helpers/utils");

const router = express.Router();

router.get("/:id", wrapPromiseResponse(
  function (req) {
    console.log(req.params);
    const id = parseInt(req.params.id, 10);
    return Period.getPeriod(id);
  }
));


router.get("/", wrapPromiseResponse(
  function () {
    return Period.getPeriods();
  }
));

module.exports = router;