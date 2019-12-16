const rootPath = "../";

const logger = require(rootPath + "helpers/logger");
const db = require(rootPath + "sequelize/models");

function getEvents(periodId, searchPattern) {
  if (
    typeof periodId !== "number" || !periodId ||
    typeof searchPattern !== "string"
  ) {
    errorMessage = "[Events] Error in getEvents method. Invalid id.";
    logger.error(errorMessage);
    return Promise.reject(new Error("Invalid Data."));
  }

  return db.sequelize.query(`
    SELECT
      id,
      title,
      description
    FROM
      event e
    WHERE
      e.period_id = :periodId
    AND (
      title like :searchPattern
      OR
      description like :searchPattern
    )`, {
      replacements: {
        periodId: periodId,
        searchPattern: "%" + searchPattern + "%"
      },
      raw: true
    }
  ).then(
    function (data) {
      return data[0];
    }
  );
}

module.exports = {
  getEvents: getEvents
};