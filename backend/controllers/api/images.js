const express = require("express");
/*const bodyParser = require("body-parser");*/

const rootPath = "../../";
const Images = require(rootPath + "services/Images");
/*const urlencodedParser = bodyParser.urlencoded({extended: false});*/
const {
  wrapPromiseResponse/*,
  getRequestRemoteAddress*/
} = require(rootPath + "helpers/utils");

const router = express.Router();

router.get("/:id", wrapPromiseResponse(
	function (req, res) {
		const photoId = parseInt(req.params.id, 10);
		return Images.getImage(res, photoId);
	}
))

router.get("/", wrapPromiseResponse(
  function (req) {
    const eventId = parseInt(req.query.eventId, 10);

    return Images.getImagesForEvent(eventId);
  }
));

module.exports = router;