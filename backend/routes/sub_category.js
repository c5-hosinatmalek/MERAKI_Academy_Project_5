const express = require("express");
const { createNewSubCategory } = require("../controllers/sub_category");

const sub_categoryRouter = express.Router();

//Post request
// post==>http://localhost:5000/sub_category
sub_categoryRouter.post("/", createNewSubCategory);

module.exports = sub_categoryRouter;
