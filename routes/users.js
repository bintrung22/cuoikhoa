var express = require("express");
var router = express.Router();
const {
  registerUser,
  authLogin,
  getUserProfile,
  getAllUser,
  updateUserProfile,
} = require("../controllers/useControllers");

// dk user
router.post("/", registerUser);
//login
router.post("/login", authLogin);
//cá nhân
router.get("/profile",  getUserProfile);
// sửa cá nhân
router.put("/profile",  updateUserProfile);

module.exports = router;
