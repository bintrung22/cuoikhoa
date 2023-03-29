const asyncHandle = require('express-async-handler');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: 'local.env' });

const SECRET_KEY = process.env.SECRET_KEY

const registerUser = asyncHandle(async (req, res) => {
  // xu ly co loi trong controller, ban loi ra error middleware và trả lỗi dạng json về cho user
  const { name, email, password } = req.body;

  // 1. Kiem tra xem user da dang ky trong database chua
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  // 2. Luu thong tin user vao database
  const newUser = await userModel.create({ name, email, password });
  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: jwt.sign({id: newUser._id}, SECRET_KEY, {
        expiresIn: '1d'
      })
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const authLogin = asyncHandle(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwt.sign({id: user._id}, SECRET_KEY, {
        expiresIn: '1d'
      })
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const getUserProfile = asyncHandle(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(401);
    throw new Error('User info not found');
  }
});


const getAllUser = asyncHandle(async (req, res) => {
  const users = await userModel.find({});
  res.json(users);
});

const updateUserProfile = asyncHandle(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password 
    }

    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    });
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

module.exports = {
  registerUser,
  authLogin,
  getUserProfile,
  getAllUser,
  updateUserProfile
}