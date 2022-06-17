const connection = require("../models/db");

const saleOrder = (req, res) => {
  const user_id = req.token.user_id;
  const {
    product_name,
    category,
    product_description,
    url_imj,
    asking_price,
    bank_account,
    phone_number,
  } = req.body;
  const query = `INSERT INTO usedproduct (product_name,category,product_description,url_imj,asking_price,bank_account,phone_number,user_id) VALUES(?,?,?,?,?,?,?,?)`;
  const data = [
    product_name,
    category,
    product_description,
    url_imj,
    asking_price,
    bank_account,
    phone_number,
    user_id,
  ];
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
      message: "the requst has been sent successfully",
      result: result,
    });
  });
};

const requstAccept = (req, res) => {
  const used_product_id = req.params.used_product_id;
  const query = `UPDATE usedproduct SET admission_status=1 WHERE used_product_id=?`;
  const data = [used_product_id];
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
      message: "it has been accepted",
      result: result,
    });
    console.log(used_product_id);
  });
};

const getAllSaleOrderForUser = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT * FROM usedproduct WHERE user_id=? `;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        messahge: "server error",
        err: err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "all SaleOrder",
      result: result,
    });
  });
};

const getAllSaleOrderForadmin = (req, res) => {
  const query =
    "SELECT * FROM usedproduct WHERE is_deleted=0 ";
  connection.query(query, (err, result) => {
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
      message: "all sale order",
      result: result,
    });
  });
};

const ApprovedSalesOrderforUser = (req, res) => {
  const user_id = req.token.user_id;
  const query =
    "SELECT * FROM usedproduct WHERE user_id=? AND admission_status=1 AND is_deleted=0";
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "error server",
        err,
        err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "all order approved",
      result: result,
    });
  });
};

const ApprovedSalesOrderforAdmin = (req, res) => {
  const query =
    "SELECT * FROM usedproduct WHERE admission_status=1 AND is_deleted=0";
  connection.query(query, (err, result) => {
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
      message: "get all producr Approved",
      result: result,
    });
  });
};

const deleteProductUsed = (req, res) => {
  const used_product_id = req.params.id;
  const query = `UPDATE usedproduct SET is_deleted=1 WHERE used_product_id=?`;
  const data = [used_product_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err,
      });
      console.log(used_product_id);
      return;
    }
    res.status(200).json({
      success: true,
      message: "delete proudect successfull",
      result: result,
    });
  });
};

const allProductUsed = (req, res) => {
  
  const query = `SELECT * FROM usedproduct WHERE  is_deleted=0 AND admission_status=1`;
  
  connection.query(query,(err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "erorr server",
        err: err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "All products used ",
      result: result,
    });
  });
};

const getOneProdectused = (req, res) => {
  const used_product_id = req.params.id;
  const query = `SELECT * FROM usedproduct WHERE used_product_id=?`;
  const data = [used_product_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error ",
        err: err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "product details",
      result: result,
    });
  });
};


const getAllProdectWithCategory=(req,res)=>{
  const category=req.params.category
  const query=`SELECT * FROM usedproduct WHERE is_deleted=0 AND admission_status=1 AND category=?`
  const data=[category]
  connection.query(query,data,(err,result)=>{
    if(err){
      res.status(500).json({
        success:false,
        message:"server error",
        result:result
      })
      return
    }
    res.status(200).json({
      success:true,
      message:`All products ${category}`,
      result:result
    })
  })
}

module.exports = {
  saleOrder,
  requstAccept,
  getAllSaleOrderForUser,
  getAllSaleOrderForadmin,
  ApprovedSalesOrderforUser,
  ApprovedSalesOrderforAdmin,
  deleteProductUsed,
  allProductUsed,
  getOneProdectused,
  getAllProdectWithCategory
};
