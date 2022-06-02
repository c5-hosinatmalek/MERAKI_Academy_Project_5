const express = require("express");
const {
  createNewCategory,
  getAllCategory,
  getProductbyCategoryID,
} = require("../controllers/category");

const categoryRouter = express.Router();

//Post request
// post==>http://localhost:5000/category
categoryRouter.post("/", createNewCategory);

// get request
// get==>http://localhost:5000/category
categoryRouter.get("/", getAllCategory);
// get==>http://localhost:5000/category/:id_category/products
categoryRouter.get("/:category_id/products", getProductbyCategoryID);

module.exports = categoryRouter;
