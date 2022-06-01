const connection = require("../models/db");
const creatPermission = (req, res) => {
  const { permission,role_id } = req.body;
  const query = `INSERT INTO permissions (permission) VALUES(?)`;
  const data =[permission];
  connection.query(query,data,(err,result)=>{
      if(err){
          res.status(500).json({
              success:false,
              message:"server error"
          })
          return ;
      }
     const query=`INSERT INTO roles_permissions (role_id,permission_id) VALUES(?,?)`;
     const permission_id = result.insertId;
     const data =[role_id,permission_id]
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
             message:"permission created",
             result:result
         })
     })
  })
};
