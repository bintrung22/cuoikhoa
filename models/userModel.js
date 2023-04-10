// khai báo cấu trúc bảng user
// thực hiện công việc mã hóa password tại đây
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  //Tên đăng nhập = Email
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  linkContact: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  //Tình trạng tài khoản - nếu value = false => đăng nhập bị từ chối
  status: {
    type: Boolean,
    require: true,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  photoURL: {
    type: String
  }
});

//pre-save: Mã hoá password trước khi lưu xuống database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (e) {
    return next(e);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;