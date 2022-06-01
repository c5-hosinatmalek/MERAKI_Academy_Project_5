const express = require("express");
const { createNewSubCategory } = require("../controllers/sub_category");

const sub_categoryRouter = express.Router();

//Post request

sub_categoryRouter.post("/", createNewSubCategory);

module.exports = sub_categoryRouter;
