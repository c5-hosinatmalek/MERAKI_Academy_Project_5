const connection = require("../models/db")


// create function to get all product

const getAllProducts =(req,res)=>{


    const query="SELECT * FROM products WHERE IS_DELETED =0"

    connection.query(query,(err,result)=>{
        if (err) {
            return res.json({success:false,err})
        }
        res.status(200).json({success:true,result})
    })
}




module.exports={getAllProducts}