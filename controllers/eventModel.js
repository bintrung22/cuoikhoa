const asyncHandle = require("express-async-handler");
const eventModel = require("../models/eventModel");
const productModel = require('../models/productModel');

const createEvent = asyncHandle(async(req,res)=>{
    const {titleEvent, imageEvent,descriptionEvent,dateStart,dateEnd,user} = req.body;
    const event = await eventModel.create({titleEvent, imageEvent,descriptionEvent,dateStart,dateEnd,user});
    if (event) {
        res
          .status(200)
          .json({
            titleEvent: event.titleEvent,
            imageEvent: event.imageEvent,
            descriptionEvent: event.descriptionEvent,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            user:event.user 
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
