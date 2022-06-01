const connection="db"
require("dotenv").config()
const bcrypt=require("bcrypt")


// craete middlleware function ==> register
const register=(req,res)=>{
    const saltRound=process.env.SALT_ROUND
    const {email,password,name,contry,role_id}=req.body
   const hashPassword=bcrypt.hash(password,saltRound)
    const query=`INSERT INTO users (email,password,name,contry,role_id) VALUSE (?,?,?,?,?)`
    const data=[email, hashPassword,name,contry,role_id]
    connection.query(query,data,(err,result)=>{
        if(err){
            res.status(500).json({
                success:false,
                message:"error server"
            })
            return;
        }
        res.status(200).json({
            success:true,
            message:"create account successfully",
            result:result
        })
    })

}

module.exports=register