const rootPath = "../";

/*const logger = require(rootPath + "helpers/logger");*/
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

module.exports = {
  getPeriods: getPeriods
};