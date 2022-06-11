const connection = require("../models/db");


const  createRequest =(req,res)=>{
const {product_id,email}=req.body
    const data =[email,product_id]
    const query="INSERT INTO REQUEST(EMAIL,PRODUCT_ID) VALUES(?,?)"
connection.query(query,data,(err,result)=>{
    if (err) {
        return res.json({err})
    }
    res.status(201).json({success:true,result})
})
}
module.exports = {createRequest}