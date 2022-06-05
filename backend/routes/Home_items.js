const express = require("express");

const {additeam,getpiciteam,deletepiciteam,updatepicitem} = require("../controllers/Home_iteams");

const Homeiteams = express.Router();


// post==>http://localhost:5000/Homeiteams/
Homeiteams.post("/:id", additeam);

// post==>http://localhost:5000/Homeiteams/
Homeiteams.get("/", getpiciteam);

// delete==>http://localhost:5000/Homeiteams/
Homeiteams.delete("/:id", deletepiciteam);

// put==>http://localhost:5000/Homeiteams/
Homeiteams.put("/:id", updatepicitem);




module.exports = Homeiteams;
