const asyncHandle = require("express-async-handler");
const productModel = require("../models/productModel");

const postProduct = asyncHandle(async (req, res) => {
  const {
    nameProduct,
    imageProduct,
    descriptionProduct,
    quantityProduct,
    weightProduct,
    user,
  } = req.body;
  const product = await productModel.create({
    nameProduct,
    imageProduct,
    descriptionProduct,
    quantityProduct,
    weightProduct,
    user,
  });
  console.log("trnug", req.body);

  if (product) {
    res
      .status(200)
      .json({
        nameProduct: product.nameProduct,
        imageProduct: product.imageProduct,
        descriptionProduct: product.descriptionProduct,
        quantityProduct: product.quantityProduct,
        weightProduct: product.weightProduct,
        //user: user
      });
    console.log(req.body);

  } else {
    res.status(401);
    throw new Error("can't create product");
  }
});


const getProducts = asyncHandle(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword;
  const searchQuery = keyword ? { name: { $regex: keyword } } : {};

  const totalProduct = await productModel.countDocuments({ ...searchQuery });
  const products = await productModel
    .find({ ...searchQuery })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({
    products,
    totalProduct,
    page,
  });
});

const updateProduct = asyncHandle(async (req, res) => {
  const { nameProduct,
    imageProduct,
    descriptionProduct,
    quantityProduct,
    weightProduct, user } = req.body;
  const id = req.params.id;
  const products = await productModel.findOne({ _id: id, user: user });
  if (products) {
    products.nameProduct = nameProduct || products.nameProduct;
    products.imageProduct = imageProduct || products.imageProduct;
    products.descriptionProduct = descriptionProduct || products.descriptionProduct;
    products.quantityProduct = quantityProduct || products.quantityProduct;
    products.weightProduct = weightProduct || products.weightProduct;
    const updateProduct = await products.save();

    res.status(200).json({
      nameProduct: updateProduct.nameProduct,
      imageProduct: updateProduct.imageProduct,
      descriptionProduct: updateProduct.descriptionProduct,
      quantityProduct: updateProduct.quantityProduct,
      weightProduct: updateProduct.weightProduct,
    })
  } else {
    res.status(401);
    throw new Error("Product not found");
  }
})

const deleteProduct = asyncHandle(async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findByIdAndDelete(id);
  if (product) {
    res.json({
      "da xoa san pham": id,
      product: product,
    });
  } else {
    res.status(401);
    throw new Error("Product can't found");
  }
});
module.exports = { postProduct, getProducts, updateProduct, deleteProduct };
