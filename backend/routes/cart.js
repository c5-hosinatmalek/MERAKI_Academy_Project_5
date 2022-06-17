const express = require("express");
const {
  AddToCart,
  deletecart,
  getUserCarts,
  checkOut,updateQuantity,
  getallcarts,
  addtosold,
  AddToCartused,
  getUserCartsprodact,
  deletecartused
} = require("../controllers/cart");
const authentication = require("../middlewares/authentication");
const cartRouter = express.Router();

//Post request

cartRouter.post("/add/:id", authentication, AddToCart);
cartRouter.delete("/:product_id", authentication, deletecart);
cartRouter.get("/getcart/", authentication, getUserCarts);
cartRouter.put("/checkout/", authentication, checkOut);
cartRouter.put("/quantity",authentication,updateQuantity)
cartRouter.get("/" ,getallcarts);
cartRouter.post("/" ,addtosold);
cartRouter.post("/:usedpro",authentication,AddToCartused);
cartRouter.post("/cart/usedprodact" ,authentication,getUserCartsprodact);
cartRouter.delete("/cart/delete/:id" ,authentication,deletecartused);

module.exports = cartRouter;
