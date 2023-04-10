const asyncHandler = require('express-async-handler');
const itemModel = require('../models/itemModel');

//1.Thêm item mới
const createNewItem = asyncHandler(async (req, res) => {
    const { itemName, description, imageList } = req.body;
    // console.log(req);
    const owner = req.user.id;
    const newItem = await itemModel.create({ itemName, description, imageList, owner });
    if (newItem) {
        res.status(200).json(newItem
            // {
            //     _id: newItem._id,
            //     itemName: newItem.itemName,
            //     createdAt: newItem.createdAt,
            //     description: newItem.description,
            //     imageList: newItem.imageList,
            //     isTrade: newItem.isTrade,
            //     owner: newItem.owner,
            //     isRemoved: newItem.isRemoved
            // }
        );
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
    const loggedInUserId = req.user.id;
    const { itemName, description, imageList, isTrade, isRemoved, owner } = req.body;
    const item = await itemModel.findById(req.params.id);
    if (item && loggedInUserId == item.owner) {
        item.itemName = itemName || item.itemName;
        item.description = description || item.description;
        item.imageList = imageList || item.imageList;
        item.isTrade = isTrade || item.isTrade;
        item.isRemoved = isRemoved || item.isRemoved;
        item.owner = owner || item.owner;

        const updatedItem = await item.save();

        res.status(200).json(updatedItem);
    } else {
        res.status(401);
        throw new Error("UPDATE ITEM FAILED!");
    }
});

//5.Xoá (Update) thông tin item theo ID
const deleteItem = asyncHandler(async (req, res) => {
    const item = await itemModel.findById(req.params.id);
    if (item) {
        item.isTrade = false;
        item.isRemoved = true;
        const updatedItem = await item.save();

        res.status(200).json(updatedItem);
    } else {
        res.status(401);
        throw new Error("UPDATE ITEM FAILED!");
    }
});

//6.Get Item theo keyword và phân trang
const getItems = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword;
    const searchQuery = keyword ? { itemName: { $regex: keyword } } : {};
    const totalItem = await itemModel.countDocuments({ ...searchQuery });
    const items = await itemModel.find({ ...searchQuery }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({
        items,
        totalItem,
        page
    });
})

//7.Get Item theo ID owner
const getItemsByOwner = asyncHandler(async (req, res) => {
    const reqUserId = req.user.id
    const owner = req.params.id;
    const item = await itemModel.find({ owner: owner });
    if (reqUserId == owner && item) {
        res.status(200).json(item);
    } else {
        res.status(401);
        throw new Error("ITEM NOT FOUND!");
    }
})

module.exports = {
    getAllItems, createNewItem, getItemById,
    updateItem, deleteItem, getItems,
    getItemsByOwner
}
