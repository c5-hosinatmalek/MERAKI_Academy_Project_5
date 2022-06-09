const express = require("express");
const {sendEmail} = require("../controllers/sendEmail")



const emailRouter =express.Router()

emailRouter.post("/",sendEmail)


module.exports=emailRouter