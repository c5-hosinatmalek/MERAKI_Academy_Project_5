
const express = require("express");
const cors = require("cors");
const connection = require("./models/db");
require("dotenv").config();
const app = express();
// midlleware
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

// router require
const roleRouter = require("./routes/role");
const permissionRouter = require("./routes/permission");
const categoryRouter = require("./routes/category");

//? middleware router
=======
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



// creat middlleware application ==>handle all requst roleRouter
app.use("/role", roleRouter);
// creat middlleware application ==>handle all requst permissionRouter

app.use("/permission", permissionRouter);
// create category router
app.use("/category", categoryRouter);
=======
app.use("/permission",permissionRouter);
// creat middlleware application ==>handle all requst registerRouter
app.use("/register",registerRouter)

















app.listen(port, () => {
  console.log(`server on in port ${port}`);
});
