const express=require("express")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(cors())
const port=process.env.PORT




const roleRouter=require("./routes/role");


// creat middlleware application ==>handle all requst roleRouter
app.use("/role",roleRouter);

















app.listen(port,()=>{
console.log(`server on in port ${port}`);
})