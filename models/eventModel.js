
const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  eventTitle:{type:String, require:true},
  eventItems:[{type:String, require:true}],
  eventDescription:{type:String, require:true},
  createdAt:{type:Date, default:Date.now()},
  imageList:[{type:String, require:true}],
  organizer:{type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
  location:{type:String, require:true}
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
