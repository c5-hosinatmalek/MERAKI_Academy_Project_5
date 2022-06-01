const connection="dt"



// create middlleware function ==>creat role

const creatRole=(req,res)=>{
const {role}=req.body;
const query=`INSERT INTO roles (role) VALUES (?)`;
const data =[role];
connection.query(query,data,(err,result)=>{
    if(err){
        res.status(500).json({
            success:false,
            message:"error server",
            err:err
        })
        return;
    }
    res.status(200).json({
        success:true,
        message:"create role successfully",
        result:result
    })
})
}

module.exports=creatRole;