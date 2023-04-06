var express = require("express");
var router = express.Router();
const { request, deleteRequest, getReceive, getRequest, replyRequest } = require("../controllers/requestController");
const { isProtect } = require("../middleware/authMiddleware");
// đăng sp
router.post("/", isProtect, request);

router.put("/:id", isProtect, replyRequest);

router.get("/request", isProtect, getRequest);

router.get("/receive", isProtect, getReceive);

router.delete("/id", isProtect, deleteRequest)

module.exports = router;
