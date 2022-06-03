const express = require("express");
const {
  createNewSubCategory,
  getSubCategory,
} = require("../controllers/sub_category");

const sub_categoryRouter = express.Router();

//Post request
// post==>http://localhost:5000/sub_category
sub_categoryRouter.post("/", createNewSubCategory);

// get request
// get==>http://localhost:5000/sub_category
sub_categoryRouter.get("/", getSubCategory);

module.exports = sub_categoryRouter;
