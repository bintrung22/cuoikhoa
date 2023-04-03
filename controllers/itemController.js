const asyncHandler = require('express-async-handler');
const itemModel = require('../models/itemModel');

//1.Thêm item mới
const createNewItem = asyncHandler(async (req, res) => {
    const { itemName, description, imageList } = req.body;
    const newItem = await itemModel.create({ itemName, description, imageList });
    if (newItem) {
        res.status(200).json({
            _id: newItem._id,
            itemName: newItem.itemName,
            createdAt: newItem.createdAt,
            description: newItem.description,
            imageList: newItem.imageList,
            isTrade: newItem.isTrade
        });
    } else {
        res.status(400);
        throw new Error("CREATE NEW ITEM FAILED!");
    }
});

//2.Hiển thị tất cả item
const getAllItems = asyncHandler(async (req, res) => {
    const items = await itemModel.find({});
    res.json(items);
});

//3.Hiển thị item theo ID
const getItemById = asyncHandler(async (req, res) => {
    const item = await itemModel.findById(req.params.id);
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(401);
        throw new Error("ITEM  NOT FOUND!");
    }
});

//4.Cập nhật thông tin item theo ID
const updateItem = asyncHandler(async (req, res) => {
    const { itemName, description, imageList } = req.body;
    const item = await itemModel.findById(req.params.id);
    if (item) {
        item.itemName = itemName || item.itemName;
        item.description = description || item.description;
        item.imageList = imageList || item.imageList;
        const updatedItem = await item.save();

        res.status(200).json({
            _id: updatedItem._id,
            itemName: updatedItem.itemName,
            createdAt: updatedItem.createdAt,
            description: updatedItem.description,
            imageList: updatedItem.imageList,
            isTrade: updatedItem.isTrade
        })
    } else {
        res.status(401);
        throw new Error("UPDATE ITEM FAILED!");
    }
});

//5.Xoá (Update) thông tin item theo ID
const deleteItem = asyncHandler(async (req, res) => {

});

module.exports = {
    getAllItems, createNewItem, getItemById, updateItem, deleteItem
}
