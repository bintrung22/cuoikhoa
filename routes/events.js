var express = require("express");
var router = express.Router();
const { createEvent, donateForEvent } = require("../controllers/eventModel");
// đăng sp
router.post("/", createEvent);
router.post("/:id", donateForEvent);


module.exports = router;
