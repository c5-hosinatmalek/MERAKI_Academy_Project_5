const express = require("express");
const { } = require("../controllers/category");

const cartRouter = express.Router();

//Post request

categoryRouter.post("/", createcart);
categoryRouter.get("/",getcartbyid)
module.exports = cartRouter;
