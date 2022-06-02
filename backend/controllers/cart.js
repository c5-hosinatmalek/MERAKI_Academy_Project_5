const connection = require("../models/db");

const AddToCart = (req, res) => {
  let check = false;
  let Quantity = 1;
  const product_id = req.params.id;
  const quantity = 1;
  const user_id = req.token.user_id;

  //   const query = "INSERT INTO cart (product_id,user_id,quantity) VALUES (?,?,?)";
  const query = `SELECT * FROM cart WHERE product_id=?`;
  const Data = [product_id];
  connection.query(query, Data, (err, result) => {
    try {
      if (result.length) {
        check = true;
      }
    } catch {
      (err) => {
        console.log(er);
      };
    }
  });
  if (check) {
    let qunt = result[0].quantity;
    let newqunt = +qunt + Quantity;
    const data = [newqunt, product_id];
    const query = `UPDATE cart SET Quantity=? WHERE protect_id=? `;
    connection.query(query, data, (err, resul) => {
      if (err) {
        return res.status(500).json({
          succses: false,
          Message: "server error",
          err,
        });
      }
      return res.status(201).json({
        succses: true,
        resul,
      });
    });
  } else {
    const query =
      "INSERT INTO cart (product_id,user_id,quantity) VALUES (?,?,?)";
    const data = [product_id, user_id, quantity];
    connection.query(query, data, (err, Result) => {
      if (err) {
        return res.status(500).json({
          succses: false,
          Message: "server error",
          err,
        });
      }
      return res.status(201).json({
        succses: true,
        Result,
      });
    });
  }
};

const deletecart = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM cart WHERE id = ?  ";
  const Data = [id];
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
      Message: "cart created",
      result: result,
    });
  });
};

const getUserCarts = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT * FROM cart WHERE user_id=?`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        succses: false,
        Message: "server error",
        err,
      });
    }
    res.status(200).json({
      succses: true,
      result,
    });
  });
};
const checkOut = (req, res) => {
  const user_id = req.token.user_id;
  const data = [user_id];
  const query = `DELETE FROM cart where user_id=?`;
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        succses: true,
        Message: "Server error",
        err,
      });
    }
    res.status(200).json({
      succses: true,
      Message: "delete cart",
      result,
    });
  });
};

module.exports = { AddToCart, deletecart, getUserCarts, checkOut };
