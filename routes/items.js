let express = require('express');
const { getAllItems, createNewItem, getItemById, updateItem, deleteItem } = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');
let router = express.Router();

//1.Thêm item mới - Done
//Sau khi thêm item trả về tất cả thông tin item vừa thêm
//Hiện tại đang gặp lỗi khi thêm imageList có thể thêm mảng rỗng []
//Nhưng giá trị từng phần tử trong mảng không được rỗng
router.post('/create', protect,createNewItem);

//2.Hiển thị tất cả item - Done
//Hiển thị tất cả thông tin của tất cả item trên database
router.get('/all', getAllItems);

//QUAN TRỌNG - Chưa phân trang item khi get và query theo keyword!

//3.Hiển thị item theo ID - Done
//Hiển thị tất cả thông tin của item theo id
router.get('/:id', getItemById);

//4.Cập nhật thông tin item theo ID - Done
//Cho chỉnh sửa tất cả các field của item - trừ _id của item
//Cần xem xét về việc không cho người dùng sửa owner?
//Gặp lỗi khi sử dụng postman boolean update về false cần ""
router.put('/update/:id', protect, updateItem,);

//5.Xoá (Update) thông tin item theo ID - Done
//Set field isRemoved = true 
router.put('/delete/:id',protect, deleteItem);

module.exports = router;