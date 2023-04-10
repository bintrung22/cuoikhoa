const asyncHandle = require('express-async-handler');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: 'local.env' });

const SECRET_KEY = process.env.SECRET_KEY

//1.Đăng ký
const registerUser = asyncHandle(async (req, res) => {
  const { name, email, password, linkContact, phoneNumber,address } = req.body;
  //1.Kiểm tra user đã tồn tại trong database hay chưa = email
  
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists!');
  }
  //2.Lưu thông tin người dùng vào database
  //Sau khi đăng ký thành công trả về thông tin người dùng - Lưu ý không trả về password

  const newUser = await userModel.create({ name, email, password, linkContact, phoneNumber, address, photoURL });

  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      linkContact: newUser.linkContact,
      phoneNumber: phoneNumber,
      isAdmin: newUser.isAdmin,
      status: newUser.status,
      createdAt: newUser.createdAt,
      address:newUser.address,
      photoURL: newUser.photoURL
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data!');
  }
});

//2.Đăng nhập
const authLogin = asyncHandle(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  //Kiểm tra email -> không tồn tại trong database -> báo lỗi
  if (user) {
    //Kiểm tra email -> tồn tại -> kiểm tra email và password gửi lên
    if (user && await bcrypt.compare(password, user.password)) {
      //Nếu đúng - trả về Token + thông tin (không bao gồm password)
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        linkContact: user.linkContact,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
        address:user.address,
        photoURL: user.photoURL,
        token: jwt.sign({ id: user._id }, SECRET_KEY, {
          expiresIn: '14d'
        })
      });
    } else {
      //Nếu sai - thông báo lỗi
      res.status(401);
      throw new Error('Invalid email or password!');
    }
  } else {
    //Nếu sai - thông báo lỗi
    res.status(401);
    throw new Error('Invalid email or password!');
  }
});

//3.Thông tin người dùng theo ID
const getUserProfile = asyncHandle(async (req, res) => {

  const user = await userModel.findById(req.params.id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      linkContact: user.linkContact,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
      status: user.status,
      createdAt: user.createdAt,
      address:user.address,
      photoURL: user.photoURL
    });
  } else {
    res.status(401);
    throw new Error('User info not found');
  }
});

//4.Cập nhật thông tin người dùng
const updateUserProfile = asyncHandle(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  //Tìm thấy user -> Cho phép cập nhật một số thông tin nhất định
  if (user) {
    user.name = req.body.name || user.name;
    user.linkContact = req.body.linkContact || user.linkContact;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.address = req.body.address||user.address;
    user.photoURL = req.body.photoURL || user.photoURL;
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      linkContact: updatedUser.linkContact,
      phoneNumber: updatedUser.phoneNumber,
      isAdmin: updatedUser.isAdmin,
      status: updatedUser.status,
      createdAt: updatedUser.createdAt,
      address:updatedUser.address,
      photoURL: updatedUser.photoURL
    });
  } else {
    res.status(401);
    throw new Error('User not found!');
  }
});

//5.Hiển thị thông tin của tất cả người dùng (Admin Only)
const getAllUser = asyncHandle(async (req, res) => {
  const users = await userModel.find({});
  res.json(users);
});

module.exports = {
  registerUser,
  authLogin,
  getUserProfile,
  getAllUser,
  updateUserProfile
}