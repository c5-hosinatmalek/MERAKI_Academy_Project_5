const express = require("express");
const { createNewCategory,getAllCategory,getProductbyCategoryID } = require("../controllers/category");

const categoryRouter = express.Router();

//Post request

categoryRouter.post("/", createNewCategory);

// get request
categoryRouter.get("/",getAllCategory)
categoryRouter.get("/:category_id/products",getProductbyCategoryID)

module.exports = categoryRouter;
