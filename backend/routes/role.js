const express=require("express");
const createRole=require("../controllers/role");

//==> create middlleware router==roleRouter
const roleRouter=express.Router();

// endpoint post==> http://localhost:5000/role

roleRouter.post("/",createRole);

module.exports=roleRouter;