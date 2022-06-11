const express = require("express");
const {createRequest} =require("../controllers/request")



const requestRouter = express.Router()

requestRouter.post("/",createRequest)



module.exports={requestRouter}