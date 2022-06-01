const express = require("express");
const { createNewCategory } = require("../controllers/category");

const categoryRouter = express.Router();

//Post request

categoryRouter.post("/", createNewCategory);

module.exports = categoryRouter;
