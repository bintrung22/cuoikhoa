var express = require("express");
var router = express.Router();
const { postProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController");
// đăng sp
router.post("/", postProduct);
// lấy sp
router.get("/", getProducts);
// sua san pham
router.put("/:id", updateProduct);
//xoa san pham
router.delete('/:id', deleteProduct);

module.exports = router;
