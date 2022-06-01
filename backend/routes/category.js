const express = require("express");
const { createNewCategory,getAllCategory } = require("../controllers/category");

const categoryRouter = express.Router();

//Post request

categoryRouter.post("/", createNewCategory);
categoryRouter.get("/",getAllCategory)
module.exports = categoryRouter;
