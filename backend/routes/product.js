const express = require("express");
const {getAllProducts,createProduct} =require("../controllers/product")

//creat middlleware router ==>  productRouter
const productRouter = express.Router();
// get==>http://localhost:5000/product
productRouter.get("/",getAllProducts );

// post==>http://localhost:5000/product
productRouter.post("/",createProduct );


module.exports = productRouter;
