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


// create function to create product
const createProduct=(req,res)=>{
    const {product_name,product_type,price,title,store_Quantity,description,category_id,sub_category}=req.body
    
const data =[product_name,product_type,price,title,store_Quantity,description,category_id,sub_category]
const query="INSERT INTO products (product_name,product_type,price,title,store_Quantity,description,category_id,sub_category) VALUES(?,?,?,?,?,?,?,?)"

connection.query(query,data,(err,result)=>{
    if (err) {
        return res.json({success:false,err})
    }
    res.status(200).json({success:true,result})
})

}
// create function to get product by id
 const getProductbyId=(req,res)=>{

    const productId=req.params.id_product
    const data=[productId]
    const query=`SELECT * FROM PRODUCTS WHERE ID=${productId};`
    connection.query(query,data,(err,result)=>{
        if (err) {
            return res.json({success:false,err})
        }
        res.status(200).json({success:true,result})
    })
 }

 // create function to delete product by id
 const deleteProductbyId=(req,res)=>{

    const productId=req.params.id_product
    const data=[productId]
    const query=`UPDATE  PRODUCTS SET IS_DELETED =1 WHERE ID=${productId};`
    connection.query(query,data,(err,result)=>{
        if (err) {
            return res.json({success:false,err})
        }
        res.status(200).json({success:true,result})
    })
 }


 

module.exports={getAllProducts,createProduct,getProductbyId,deleteProductbyId}