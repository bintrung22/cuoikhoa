var express = require("express");
var router = express.Router();
const {  request, deleteRequest,getReceive,getRequest,replyRequest} = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");
// đăng sp
router.post("/",protect, request);

router.put("/:id",protect, replyRequest);

router.get("/request",protect, getRequest);

router.get("/receive",protect, getReceive);

router.delete("/id",protect,deleteRequest)

module.exports = router;
