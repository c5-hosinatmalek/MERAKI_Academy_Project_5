const express = require("express");
const {getAllProducts} =require("../controllers/product")

//creat middlleware router ==>  productRouter
const productRouter = express.Router();
// get==>http://localhost:5000/product
productRouter.get("/",getAllProducts );

module.exports = productRouter;
