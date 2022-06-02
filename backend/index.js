const express=require("express")
const cors=require("cors")
const connection=require("./models/db")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())
const port=process.env.PORT




const roleRouter=require("./routes/role");
const permissionRouter=require("./routes/permission")
const registerRouter=require("./routes/register")
const loginRouter=require("./routes/login")
const userRouter=require("./routes/user")


// creat middlleware application ==>handle all requst roleRouter
app.use("/role",roleRouter);
// creat middlleware application ==>handle all requst permissionRouter
app.use("/permission",permissionRouter);
// creat middlleware application ==>handle all requst registerRouter
app.use("/register",registerRouter)
// creat middlleware application ==>handle all requst loginrouter
app.use("/login",loginRouter)
// creat middlleware application ==>handle all requst userRouter
app.use("/user",userRouter)

















app.listen(port,()=>{
console.log(`server on in port ${port}`);
})