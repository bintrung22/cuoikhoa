const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
    userRequest: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"  },
    productRequest: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
    userReceive: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    productReceive: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
    status: { type:String, required: true, default:"pending" },
    message: { type: String, required: true },
    requestDate: { type:Date, default:Date.now()},
    updateDate: { type: Date, required: false },

});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
