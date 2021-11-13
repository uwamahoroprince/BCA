const express = require("express");

const { createBisinessIdea } = require("../controller/bisinessIdea");

const router = express.Router();

router.route("/").post(createBisinessIdea);

module.exports = router;
