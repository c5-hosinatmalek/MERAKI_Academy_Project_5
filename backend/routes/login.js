const express=require("express")
const login=require("../controllers/login")
// creat middlleware router loginRouter
const loginRouter=express.Router()
// http method =>post endpoint==> http://localhost:5000/login

loginRouter.post("/",login)
module.exports=loginRouter;