const express=require("express");
const creatRole=require("../controllers/role");

//==> create middlleware router==roleRouter
const roleRouter=express.Router();

// endpoint ==> http://localhost:5000/role

roleRouter.post("/",creatRole);

module.exports=roleRouter;