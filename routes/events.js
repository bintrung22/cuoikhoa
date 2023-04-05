var express = require("express");
var router = express.Router();
const { createEvent,updateEvent,deleteEvent ,getEventAll,getEvent,getEventTotal} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");
// đăng ev
router.post("/",protect, createEvent);
// sua ev
router.put("/:id",protect, updateEvent);
//delet ev
router.delete("/:id",protect, deleteEvent);

router.get("/",getEventAll)

router.get("/admin",protect, getEvent)

router.get("/:id", getEventTotal)

module.exports = router;
