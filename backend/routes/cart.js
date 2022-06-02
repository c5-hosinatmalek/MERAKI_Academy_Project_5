const express = require("express");
const {
  AddToCart,
  deletecart,
  getUserCarts,
  checkOut,
} = require("../controllers/cart");
const authentication = require("../middlewares/authentication");
const cartRouter = express.Router();

//Post request

cartRouter.post("/add/:id", authentication, AddToCart);
cartRouter.delete("/delete/:id", authentication, deletecart);
cartRouter.get("/getcart/", authentication, getUserCarts);
cartRouter.delete("/checkout/", authentication, checkOut);
module.exports = cartRouter;
