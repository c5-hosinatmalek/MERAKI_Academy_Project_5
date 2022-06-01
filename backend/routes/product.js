const express = require("express");
const {getAllProducts,createProduct,getProductbyId} =require("../controllers/product")

//creat middlleware router ==>  productRouter
const productRouter = express.Router();
// get==>http://localhost:5000/product
productRouter.get("/",getAllProducts );

productRouter.get("/:id_product",getProductbyId)

// post==>http://localhost:5000/product
productRouter.post("/",createProduct );


module.exports = productRouter;
