const express=require("express")
// creat middllrware router registerRouter
const registerRouter=express.Router()
// post ==> http://localhost:5000/register
registerRouter.post("/",registerRouter)

module.exports=registerRouter
