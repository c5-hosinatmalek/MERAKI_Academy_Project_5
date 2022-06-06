const express = require("express");
const {
  AddToCart,
  deletecart,
  getUserCarts,
  checkOut,updateQuantity
} = require("../controllers/cart");
const authentication = require("../middlewares/authentication");
const cartRouter = express.Router();

//Post request

cartRouter.post("/add/:id", authentication, AddToCart);
cartRouter.delete("/:product_id", authentication, deletecart);
cartRouter.get("/getcart/", authentication, getUserCarts);
cartRouter.put("/checkout/", authentication, checkOut);
cartRouter.put("/quantity",authentication,updateQuantity)
module.exports = cartRouter;
