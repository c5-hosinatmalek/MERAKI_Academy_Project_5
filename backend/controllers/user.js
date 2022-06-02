const connection=require("../models/db")
const getAllUser=(req,res)=>{
    const query=`SELECT * FROM users WHERE is_deleted=0`
    connection.query(query,(err,result)=>{
        if(err){
            res.status(500).json({
                success:false,
                message:"server error"
            })
            return;
        }
        if(result.length>0){
            res.status(200).json({
                success:true,
                message:" get all user ",
                result:result
            })
        }else{
            res.status(200).json({
                success:true,
                message:"there are no user ",
                result:result
            })
        }
    })
}

const deleteUserByid=(req,res)=>{
    const {id}=req.params
    const query=`UPDATE users SET is_deleted=1 WHERE id=?`;
    const data =[id]
    connection.query(query,data,(err,result)=>{
        if(err){
           res.status(500).json({
            success:false,
            message:"server error",
            err:err
           })
           return;
        }
        res.status(200).json({
            success:true,
            message:"delete user successfully",
            result:result
        })
    })
}

module.exports={getAllUser,deleteUserByid}