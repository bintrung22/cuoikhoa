const asyncHandle = require("express-async-handler");
const itemModel = require("../models/itemModel");
const requestModel = require("../models/requestModel");
const userModel = require("../models/userModel");

const request = asyncHandle(async (req, res) => {
  let { productRequest, productReceive, message } = req.body;
  /// thay userrequest voi req.user._id
  const userRequest = req.user._id;
  const product1 = await itemModel.findOne({ _id: productRequest, owner:userRequest });
  const product2 = await itemModel.findById({ _id: productReceive });
  let userReceive = product2.owner;
  console.log( product1 !== product2)
  if (product1&& product2&&
    product1.isTrade === true &&
    product2.isTrade === true &&
    userRequest != userReceive &&
    productRequest != productReceive
  ) {
    const request = await requestModel.create({
      userRequest,
      productRequest,
      userReceive,
      productReceive,
      message,
    });
    if (request) {
      res.json({
        request,
        // userRequest: userRequest,
        // productRequest: productRequest,
        // userReceive: userReceive,
        // productReceive: productReceive,
        // status: request.status,
        // message: message,
        // requestDate: request.requestDate,
        // updateDate: request.updateDate,
      });
    } else {
      res.status(404);
      throw new Error("khong the tao requset");
    }
  } else {
    res.status(404);
    throw new Error("khong the tao requset");
  }
});

const replyRequest = asyncHandle(async (req, res) => {
  const { status } = req.body;
  const idRequest = req.params.id;
  let request = requestModel.findById({ _id: idRequest });

  if (request && request.requestReceive === req.user.id) {
    request.status = status;
    request.updateDate = Date.now();
    let update = await request.save();
    if (update && update.status === "accept") {
      let product1 = await itemModel.findById({
        _id: update.productReceive,
      });
      let product2 = await itemModel.findById({
        _id: update.productRequest,
      });
      product1.isTrade = false;
      product2.isTrade = false;
      await product1.save();
      await product2.save();
      res.status(200);
      res.json({
        update,
      });
    } else if (update && update.status === "cancel") {
      res.json({
        update,
      });
    } else {
      res.status(404);
      throw new Error("khong the phan hoi");
    }
  }
});

const getRequest = asyncHandle(async(req,res)=>{
    const request = await requestModel.findById({userRequest:req.user._id});
    if(request){
        res.status(200);
        res.json({
            request
        })
    }else{
        res.status(400);
        throw new Error("khong the lay request");
    }
})
const getReceive = asyncHandle(async(req,res)=>{
    const receive = await requestModel.findById({userReceive:req.user._id});
    if(receive){
        res.status(200);
        res.json({
            receive
        })
    }else{
        res.status(400);
        throw new Error("khong the lay receive");
    }
})

const deleteRequest = asyncHandle(async(req,res)=>{
    const deleteRequest = await requestModel.findOneAndDelete({_id:req.params.id});
    if(deleteRequest)
    {
        res.status(200);
        res.json({
            message: "da xoa thanh cong",
            deleteRequest
        })
    }else{
        res.status(404);
        throw new Error("can't delete request");
    }
})

module.exports = { request, deleteRequest,getReceive,getRequest,replyRequest };
