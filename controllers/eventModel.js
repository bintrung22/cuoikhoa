const asyncHandle = require("express-async-handler");
const eventModel = require("../models/eventModel");
const productModel = require('../models/productModel');

const createEvent = asyncHandle(async(req,res)=>{
  // lúc có token rồi thì bỏ organizer là được
    let {eventTitle, eventItems,eventDescription,createdAt,imageList,location ,organizer } = req.body;
    const item = eventItems.split(",")
    eventItems = item;
    const event = await eventModel.create({eventTitle, eventItems,eventDescription,createdAt,imageList,location ,organizer});
    if (event) {
        res
          .status(200)
          .json({
            eventTitle: event.eventTitle,
            eventItems: event.eventItems,
            eventDescription: event.eventDescription,
            createdAt: event.createdAt,
            imageList: event.imageList,
            organizer:event.organizer,
            location:event.location
    }      );
      } else {
        res.status(401);
        throw new Error("can't create event");
      }
});

const donateForEvent= asyncHandle(async(req,res)=>{
    const{user,donation}= req.body;
    const event = await eventModel.findById(req.params.id);
    const check = await productModel.findOne({_id:donation, user:user});
    if(check.quantityProduct>0  && event.status){
     event.donation=[...event.donation,check.id];
     event.supporter+=1;
     check.quantityProduct = Number(check.quantityProduct) -1;
     await event.save();
     await check.save();
     res.json(event)
    }else{
        res.status(401);
        throw new Error("can't donate");
      }
})

module.exports = {createEvent,donateForEvent};
