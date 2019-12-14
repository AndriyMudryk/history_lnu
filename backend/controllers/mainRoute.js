const express = require("express");

const router = express.Router();

// Authentification API
router.use("/auth", require("./auth"));

// Rest API
router.use("/rest/api/v1", require("./api"));

module.exports = router;