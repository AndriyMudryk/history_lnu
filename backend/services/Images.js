const path = require("path");
const fs = require("fs");

const rootPath = "../";

const logger = require(rootPath + "helpers/logger");
const db = require(rootPath + "sequelize/models");
const config = require(rootPath + "config");
const utils = require(rootPath + "helpers/utils");

const {
  ServerError
} = require(rootPath + "helpers/Errors");

function getImagesForEvent(eventId) {
  if (
    typeof eventId !== "number" || !eventId
  ) {
    errorMessage = "[Images] Error in getImagesForEvent method. Invalid id.";
    logger.error(errorMessage);
    return Promise.reject(new Error("Invalid Data."));
  }

  return db.image.findAll({
    attributes: ["id", "title"],
    where: {
      event_id: eventId
    }
  }, {
    raw: true
  });
}

function getImage(res, imageId) {
  if(
    typeof imageId !== "number" || !imageId
  ) {
    errorMessage = "[Images] Error in getImage method. Invalid imageId.";
  }

  return db.image.findOne({
    raw: true,
    attributes: [
      "path"
    ],
    where: {
      id: imageId
    }
  }).then(
    function (image) {
      const imageFileName = image.path;

      const mime = {
        gif: "image/gif",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        svg: "image/svg+xml",
        tif: "image/tiff"
      };
      const filePath = config.projectDir + "/images/" + imageFileName;
      const contentType = mime[path.extname(filePath).slice(1)];
      if (!contentType) {
        throw new ServerError(
          {
            code: "unsupported_image_extension",
            message: "Could not determine file content type. Type: " + path.extname(filePath).slice(1),
            debugMessage: "[User] Error in getUserPhotoImage method. File path: " + filePath
          }
        );
      }
      const fileReadStream = fs.createReadStream(filePath);
      fileReadStream.on("open", function () {
        res.set("Content-Type", contentType);
      });
      return utils.promisifyPipe(fileReadStream, res).catch(
        function (error) {
          throw new ServerError(
            {
              code: "cannot_read_image",
              message: "Could not find image file.",
              error: error,
              debugMessage: "[User] Error in getUserPhotoImage method. File path: " + filePath
            }
          );
        }
      );
    }
  );
}

module.exports = {
  getImagesForEvent: getImagesForEvent,
  getImage: getImage
};