const { query } = require("../models/db");
const connection = require("../models/db");
const getAllUser = (req, res) => {
  const query = `SELECT * FROM users  `;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
result
        
      });
      return;
    }
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: " get all user ",
        result: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "there are no user ",
        result: result,
      });
    }
  });
};

const deleteUserByid = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE users SET is_deleted=1 WHERE USER_ID=?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "delete user successfully",
      result: result,
    });
  });
};
const makeAdmin=(req,res)=>{
  const user_id=req.params.id
  const query="UPDATE USERS SET role_id=1 WHERE USER_ID=?"
  const data =[user_id]
  connection.query(query,data,(err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "make it admin successfully",
      result: result,
    });
  })
}
const getUserbyEmail=(req,res)=>{
  const email=req.params.email
  const query="select * from users where email=?"
  const data =[email]
  connection.query(query,data,(err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      result: result,
    });
  })
}

module.exports = { getAllUser, deleteUserByid,makeAdmin,getUserbyEmail };
