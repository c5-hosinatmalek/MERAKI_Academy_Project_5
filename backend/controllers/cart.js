const connection = require("../models/db");

const AddToCart = (req, res) => {
  let check = false;
  let quantity = 1;
  const product_id = req.params.id;
  // const quantity = 1;
  const user_id = req.token.user_id;

  //   const query = "INSERT INTO cart (product_id,user_id,quantity) VALUES (?,?,?)";
  const query = `SELECT * FROM cart WHERE product_id=?`;
  const Data = [product_id];
  connection.query(query, Data, (err, result) => {
    try {
      if (result.length) {
        check = true;
        quantity = result[0].quantity;
      }
    } catch {
      (err) => {
        console.log(er);
      };
    }
  });
  setTimeout(() => {
    if (check) {
      let newqunt = quantity + 1;
      const data = [newqunt, product_id, user_id];
      const query = `UPDATE cart SET Quantity=? WHERE product_id=? AND user_id=? `;
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
  }, 100);
};

const deletecart = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM cart WHERE cart_id = ?  ";
  const Data = [id];
  connection.query(query, Data, (err, result) => {
    if (err) {
      return res.status(500).json({
        succses: false,
        Message: "sever error",
        err: err,
      });
    }
    res.status(200).json({
      succses: true,
      Message: "delete product from cart",
      result: result,
    });
  });
};

const getUserCarts = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT * FROM cart INNER JOIN PRODUCTS ON CART.product_id =PRODUCTS.PRODUCT_ID  WHERE cart.user_id=?`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
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

  const query = `UPDATE cart SET is_deleted = 1 WHERE user_id=?`;
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
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
