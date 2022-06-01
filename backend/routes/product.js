const express = require("express");
const {getAllProducts,createProduct,getProductbyId,deleteProductbyId} =require("../controllers/product")

//creat middlleware router ==>  productRouter
const productRouter = express.Router();
// get==>http://localhost:5000/product
productRouter.get("/",getAllProducts );

// post==>http://localhost:5000/product/:id_product
productRouter.get("/:id_product",getProductbyId)

// delete==>http://localhost:5000/product
productRouter.delete("/:id_product",deleteProductbyId );

//delete


module.exports = productRouter;
