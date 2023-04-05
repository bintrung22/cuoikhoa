var express = require("express");
var router = express.Router();
const { createEvent, updateEvent, deleteEvent, getEventAll, getEvent, getEventTotal } = require("../controllers/eventController");
const { isProtect } = require("../middleware/authMiddleware");
// đăng ev
router.post("/", isProtect, createEvent);
// sua ev
router.put("/:id", isProtect, updateEvent);
//delet ev
router.delete("/:id", isProtect, deleteEvent);

router.get("/", getEventAll)

router.get("/admin", isProtect, getEvent)

router.get("/:id", getEventTotal)

module.exports = router;
