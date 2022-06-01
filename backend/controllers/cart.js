const connection = require("../models/db");

const AddToCart = (req, res) => {
  const protect_id = req.params.id;
  const { quantity } = req.body;
  const userid = req.token.user_id;
  const query = "INSERT INTO cart (product_id,user_id,quantity) VALUES (?,?,?)";
  const Data = [protect_id, userid, quantity];
  connection.query(query, Data, (err, result) => {
    if (err) {
      return res.status(500).json({
        succses: false,
        Message: "sever error",
        err: err,
      });
    }
    res.status(201).json({
      succses: true,
      Message:"cart created",
      result: result,
    });
  });
};




module.exports = { AddToCart };
