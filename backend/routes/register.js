const express = require("express");
// creat middllrware router registerRouter
const registerRouter = express.Router();
const register = require("../controllers/register");

// post ==> http://localhost:5000/register
registerRouter.post("/", register);

module.exports = registerRouter;
