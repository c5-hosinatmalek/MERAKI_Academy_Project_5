const connection=require("../models/db")


const createNewCategory=(req,res)=>{

const {category,picUrl} =req.body

const query ="INSERT INTO categories(category,picUrl) VALUES(?,?)"
const data =[category,picUrl]
connection.query(query,data,(err,result)=>{
    if(err){
        return res.json({success:false,err})
    }
    res.status(201).json({success:true,result})
})


}

module.exports={createNewCategory}