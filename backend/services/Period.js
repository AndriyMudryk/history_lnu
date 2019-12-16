const rootPath = "../";

const logger = require(rootPath + "helpers/logger");
const db = require(rootPath + "sequelize/models");


function getPeriods() {
  return db.period.findAll({
    attributes: ["id", "title"]
  }, {
    raw: true
  }).then(
    function (periods) {
      return periods;
    }
  );
}

function getPeriod(id) {
  if (
    typeof id !== "number" || !id
  ) {
    errorMessage = "[Period] Error in getPeriod method. Invalid id.";
    logger.error(errorMessage);
    return Promise.reject(new Error("Invalid Data."));
  }

  return db.period.findOne({
    where: {
      id: id
    }
  }, {
    raw: true
  });
}

module.exports = {
  getPeriods: getPeriods,
  getPeriod: getPeriod
};