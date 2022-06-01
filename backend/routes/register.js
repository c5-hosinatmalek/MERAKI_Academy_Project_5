const express=require("express")
const register=require("../controllers/register")
// creat middllrware router registerRouter
const registerRouter=express.Router()
// post ==> http://localhost:5000/register
registerRouter.post("/",register)

module.exports=registerRouter
