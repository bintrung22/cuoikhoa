const asyncHandle = require("express-async-handler");
const eventModel = require("../models/eventModel");

const createEvent = asyncHandle(async (req, res) => {
  // lúc có token rồi thì bỏ organizer thanh user là được
  let {
    eventTitle,
    eventItems,
    eventDescription,
    // createdAt,
    imageList,
    location,

  } = req.body;
  const organizer = req.user.id;

  const item = eventItems[0].split(",");
  eventItems = item;
  console.log(item)
  const event = await eventModel.create({
    eventTitle,
    eventItems,
    eventDescription,
    //  createdAt,
    imageList,
    location,
    organizer,
  });
  if (event) {
    res.status(200).json({
      eventTitle: event.eventTitle,
      eventItems: event.eventItems,
      eventDescription: event.eventDescription,
      createdAt: event.createdAt,
      imageList: event.imageList,
      organizer: event.organizer,
      location: event.location,
    });
  } else {
    res.status(401);
    throw new Error("can't create event");
  }
});

const updateEvent = asyncHandle(async (req, res) => {
  const {
    eventTitle,
    eventItems,
    eventDescription,
    imageList,
    location,
  } = req.body;
  const organizer = req.user.id;
  const id = req.params.id;
  const event = await eventModel.findOne({ _id: id, organizer: organizer });
  if (event) {
    event.eventTitle = eventTitle || event.eventTitle;
    event.eventItems = eventItems || event.eventItems;
    event.eventDescription = eventDescription || event.eventDescription;
    event.imageList = imageList || event.imageList;
    event.location = location || event.location;
    const updateEvent = await event.save();
    res.status(200).json({
      eventTitle: updateEvent.eventTitle,
      eventItems: updateEvent.eventItems,
      eventDescription: updateEvent.eventDescription,
      createdAt: updateEvent.createdAt,
      imageList: updateEvent.imageList,
      location: updateEvent.location,
    });
  } else {
    res.status(401);
    throw new Error("can't update event");
  }
});

const deleteEvent = asyncHandle(async (req, res) => {
  const event = await eventModel.findByIdAndDelete({ _id: req.params.id });
  if (event) {
    res.status(200).json({
      message: "đã xóa thành công",
      id: event.id
    })
  } else {
    res.status(401);
    throw new Error("can't delete event");
  }
});

const getEventAll = asyncHandle(async (req, res) => {
  const event = await eventModel.find();
  if (event) {
    res.status(200).json({
      event
    })
  } else {
    res.status(401);
    throw new Error("kho co event nao het");
  }
});

const getEventTotal = asyncHandle(async (req, res) => {
  const event = await eventModel.find({ _id: req.params.id });
  if (event) {
    res.status(200).json({
      event
    })
  } else {
    res.status(401);
    throw new Error("kho co event nao het");
  }
});

const getEvent = (async (req, res) => {
  // co user thi thay no bang user la duoc
  const organizer = req.user.id;
  const event = await eventModel.find({ organizer: organizer });
  if (event) {
    res.status(200).json({
      event
    })
  } else {
    res.status(401);
    throw new Error("kho co event nao het");
  }
});

module.exports = { createEvent, getEventTotal, updateEvent, deleteEvent, getEventAll, getEvent };
