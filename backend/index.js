const express = require("express");
const cors = require("cors");
const connection = require("./models/db");
require("dotenv").config();
// router require
const roleRouter = require("./routes/role");
const permissionRouter = require("./routes/permission");
const categoryRouter = require("./routes/category");
const registerRouter =require("./routes/register")
const sub_categoryRouter=require("./routes/sub_category")
const app=express()
app.use(cors())
app.use(express.json())
const port=process.env.PORT



//? middleware router


// creat middlleware application ==>handle all requst roleRouter
app.use("/role", roleRouter);
// creat middlleware application ==>handle all requst permissionRouter

app.use("/permission", permissionRouter);
// create category router
app.use("/category", categoryRouter);

// creat middlleware application ==>handle all requst registerRouter
app.use("/register",registerRouter)

// create sub_category router
app.use("/sub_category",sub_categoryRouter)




















app.listen(port, () => {
  console.log(`server on in port ${port}`);
});
