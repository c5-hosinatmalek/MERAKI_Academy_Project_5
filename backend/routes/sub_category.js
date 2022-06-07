const express = require("express");
const {
  createNewSubCategory,
  getSubCategory,getSubCategoryBycategoryId
} = require("../controllers/sub_category");

const sub_categoryRouter = express.Router();

//Post request
// post==>http://localhost:5000/sub_category
sub_categoryRouter.post("/", createNewSubCategory);

// get request
// get==>http://localhost:5000/sub_category
sub_categoryRouter.get("/", getSubCategory);
// get===>http://localhost:5000/sub_category/:id
sub_categoryRouter.get("/:category_id", getSubCategoryBycategoryId);

module.exports = sub_categoryRouter;
