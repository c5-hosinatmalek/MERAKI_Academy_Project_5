const express = require("express");
const creatPermission = require("../controllers/permission");

//creat middlleware router ==>  permissionRouter
const permissionRouter = express.Router();
// post==>http://localhost:5000/permission
permissionRouter.post("/", creatPermission);
module.exports = permissionRouter;
