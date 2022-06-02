const connection=require("../models/db")
require("dotenv").config()
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")
const login=(req,res)=>{
    const {email,password}=req.body
    const query=`SELECT * FROM users WHERE email=?`;
    const data=[email];
    connection.query(query,data,(err,result)=>{
        if(err){
            res.status(500).json({
                success:false,
                message:"server error",
                err:err
            })
            return;
        }
        if(result.length>0){
            bcrypt.compare(password,result[0].password,(err,response)=>{
                if(err){ res.status(500).json({"error bcrypt compare":err}) }

                if(response){
                   const payload={
                       user_id:result[0].id,
                       country:result[0].country,
                       role:result[0].role_id
                   }
                    const secret=process.env.SECRET
                  const token=  jwt.sign(payload,secret)
                  res.status(200).json({
                      success:true,
                      token:token
                  })
                }else{
                    res.status(403).json({
                        success:false,
                        message:"The password you’ve entered is incorrect"
                    })
                    return;
                }

            })
        }else{
            res.status(404).json({
                success:false,
                message:"The email doesn't exist"
            })
        }
    })

}
module.exports=login;