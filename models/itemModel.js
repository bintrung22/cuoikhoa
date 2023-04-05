const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    //Tên sản phẩm
    itemName: {
        type: String,
        required: true
    },
    //Ngày thêm sản phẩm
    createdAt: {
        type: Date,
        default: Date.now
    },
    //Mô tả sản phẩm
    description: {
        type: String
    },
    //Danh sách hình ảnh sản phẩm - Mỗi hình ảnh là 1 giá trị trong mảng
    imageList: [{
        type: String,
        required: true
    }],
    //Sản phẩm sẵn sàng để giao dịch (Hiển thị trên trang sản phẩm)
    //Sản phẩm sau khi được thêm mới sẽ mặc định đc hiển thị trên trang hiển thị sản phẩm
    //Sẵn sàng giao dịch ngay sau khi đc thêm mới
    isTrade: {
        type: Boolean,
        required: true,
        default: true
    },
    //Id (User) người sở hữu sản phẩm
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    //Người dùng xoá sản phẩm -> set isRemoved = true 
    //để ẩn khỏi trang sản phẩm riêng của người dùng
    //Set luôn cả isTrade = false để biến mất khỏi trang sản phẩm
    isRemoved: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;