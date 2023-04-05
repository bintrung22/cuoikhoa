//Có 3 loại người dùng: guest, user và admin
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel');
require('dotenv').config({ path: 'local.env' });

const SECRET_KEY = process.env.SECRET_KEY

//Kiểm tra có Token được gửi lên hay không? Token có hợp lệ hay không?
const isProtect = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith('Bearer')) {
        //Có Token được gửi lên - Tiếp tục kiểm tra Token có chính xác hay không?
        try {
            const token = req.headers.authorization.split(' ')[1];
            const userVerify = jwt.verify(token, SECRET_KEY);
            const userId = userVerify.id;
            const userInfo = await userModel.findById(userId).select('-password');
            req.user = userInfo;
            next();
        } catch (e) {
            res.status(401);
            throw new Error('Token invalid!');
        }
    } else {
        res.status(401);
        throw new Error('Not authorization or no Token!');
    }
});

//Check user vừa đăng nhập có isAdmin = true?
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('User is not Admin!');
    }
}

module.exports = {
    isProtect,
    isAdmin
}