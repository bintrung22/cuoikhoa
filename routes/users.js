var express = require("express");
var router = express.Router();
const {
  registerUser,
  authLogin,
  getUserProfile,
  getAllUser,
  updateUserProfile,
} = require("../controllers/userControllers");
//Hàm isProtect: Xác minh token đã phát sinh sau khi đăng nhập có chính xác?
//Hàm isAdmin: Kiểm tra có phải là Admin vừa đăng nhập?
const { isProtect, isAdmin } = require('../middleware/authMiddleware');

//1.Đăng ký user mới
router.post("/register", registerUser);

//2.Đăng nhập
router.post("/login", authLogin);

//3.Lấy thông tin user
router.get("/profile/:id", getUserProfile);

//4.Cập nhật thông tin user
router.put("/update", isProtect, updateUserProfile);

//5.Lấy thông tin tất cả user
router.get('/all', isProtect, isAdmin, getAllUser);

module.exports = router;
