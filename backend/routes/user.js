const express = require("express");
const { getAllUser, deleteUserByid,makeAdmin } = require("../controllers/user");
//==> create middleware router userRouter
const userRouter = express.Router();
//==> http method get endpoint ==>http://localhost:5000/user
userRouter.get("/", getAllUser);

//==>http method delete endpoint ==> http://localhost:5000/user/:id

userRouter.delete("/:id", deleteUserByid);
//==>http method put endpoint ==> http://localhost:5000/user/:id

userRouter.put("/:id",makeAdmin)





module.exports = userRouter;