const connection = require("../models/db");

const AddToCart = (req, res) => {
  let check = false;
  let quantity = 1;
  const product_id = req.params.id;

  const user_id = req.token.user_id;

  const query = `select * from cart where product_id =? and is_deleted=0;`;
  const Data = [product_id];
  connection.query(query, Data, (err, result) => {
    try {
      if (result.length) {
        check = true;
        quantity = result[0].quantity;
      }
    } catch {
      (err) => {
        console.log(err);
      };
    }
  });
  setTimeout(() => {
    if (check) {
      let newqunt = quantity + 1;
      const data = [newqunt, product_id, user_id];
      const query = `UPDATE cart SET Quantity=? WHERE product_id=? AND user_id=? AND is_deleted = 0`;
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
  const product_id = req.params.product_id;
  const user_id = req.token.user_id;
  const query = "DELETE FROM cart WHERE product_id = ? AND user_id=?  ";
  const Data = [product_id, user_id];
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
  const query = `SELECT * FROM cart INNER JOIN PRODUCTS ON CART.product_id =PRODUCTS.PRODUCT_ID  WHERE CART.is_deleted = 0 AND cart.user_id=?`;
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
const checkOut = async (req, res) => {
  const user_id = req.token.user_id;
  const { arrayCheckout } = req.body;
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
  });
  arrayCheckout &&
    arrayCheckout.forEach((element) => {
      const data2 = [+element.quantity, element.product_id];
      const query2 =
        "UPDATE products SET Store_Quantity=Store_Quantity-? WHERE product_id=? AND IS_DELETED =0";
      connection.query(query2, data2, (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ succ: true, result });
      });
    });
};
const updateQuantity = (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.token.user_id;
  const data = [+quantity, product_id, user_id];
  const query = `UPDATE cart SET Quantity=? WHERE product_id=? AND user_id=? ;`;
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        succses: false,
        Message: "server error",
        err,
      });
    }
    return res.status(201).json({
      succses: true,
      result,
    });
  });
};

const getallcarts = (req, res) => {
  const query = `SELECT * FROM cart INNER JOIN PRODUCTS ON CART.product_id =PRODUCTS.PRODUCT_ID INNER JOIN sub_categories ON  PRODUCTS.sub_category=sub_categories.subCategory_id INNER JOIN users ON users.user_id=cart.user_id WHERE CART.is_deleted = 1`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        succses: false,
        Message: err,
      });
    }
    res.json({
      succses: true,
      result,
    });
  });
};

module.exports = {
  AddToCart,
  deletecart,
  getUserCarts,
  checkOut,
  updateQuantity,
  getallcarts,
};
