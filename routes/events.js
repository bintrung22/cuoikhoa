var express = require("express");
var router = express.Router();
const { createEvent,updateEvent,deleteEvent ,getEventAll,getEvent} = require("../controllers/eventModel");
// đăng ev
router.post("/", createEvent);
// sua ev
router.put("/:id", updateEvent);
//delet ev
router.delete("/:id", deleteEvent);

router.get("/",getEventAll)
router.get("/:id",getEvent)


module.exports = router;
