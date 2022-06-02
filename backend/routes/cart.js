const express = require("express");
const { AddToCart, deletecart, getUserCarts,checkOut} = require("../controllers/cart");
const authentication=require("../middlewares/authentication")

const cartRouter = express.Router();

//Post request

cartRouter.post("/add/:id",authentication, AddToCart);
cartRouter.delete("/delete/:id",deletecart)
cartRouter.post("/getcart/",getUserCarts)
cartRouter.delete("/checkout/",checkOut)
module.exports = cartRouter;
