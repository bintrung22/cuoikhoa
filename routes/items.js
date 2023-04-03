let express = require('express');
const { getAllItems, createNewItem, getItemById, updateItem, deleteItem } = require('../controllers/itemController');
let router = express.Router();

//1.Thêm item mới - Done
router.post('/create', createNewItem);

//2.Hiển thị tất cả item - Done
router.get('/all', getAllItems);

//3.Hiển thị item theo ID - Done
router.get('/:id', getItemById);

//4.Cập nhật thông tin item theo ID - Done
router.put('/update/:id', updateItem);

//5.Xoá (Update) thông tin item theo ID - Done
router.delete('/delete/:id', deleteItem);

module.exports = router;