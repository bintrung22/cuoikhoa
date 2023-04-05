var express = require("express");
var router = express.Router();
const {  request, deleteRequest,getReceive,getRequest,replyRequest} = require("../controllers/requestController");
// đăng sp
router.post("/", request);

router.put("/:id", replyRequest);

router.get("/request", getRequest);

router.get("/receive", getReceive);

router.delete("/id",deleteRequest)

module.exports = router;
