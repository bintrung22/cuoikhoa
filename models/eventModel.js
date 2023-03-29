
const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  titleEvent: { type: String, require: true },
  imageEvent: [{ type: String, require: true }],
  descriptionEvent: { type: String, require: true,default:0 },
  supporter: { type: Number, require: true },
  dateStart: { type:Date, require:true, min:Date.now},
  dateEnd: { type:Date, require:true},
  donation: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" }],
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  status: {type:Boolean, require:true, default:true}
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
