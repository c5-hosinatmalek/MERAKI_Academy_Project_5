const res = require("express/lib/response");
const connection = require("../models/db");

// create function to get all product

const getAllProducts = (req, res) => {
  const query =
    "SELECT * FROM PRODUCTS  INNER JOIN CATEGORIES ON PRODUCTS.category_id=CATEGORIES.CATEGORY_ID INNER JOIN sub_categories on products.sub_category = sub_categories.subCategory_id  WHERE  PRODUCTS.IS_DELETED =0;";

  connection.query(query, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, result });
  });
};

// create function to create product
const createProduct = (req, res) => {
  const {
    picUrlProd,
    title,
    category_id,
    sub_category,
    product_name,
    product_type,
    price,
    description,
    Store_Quantity,
  } = req.body;

  const data = [
    picUrlProd,
    title,
    category_id,
    sub_category,
    product_name,
    product_type,
    price,
    description,
    Store_Quantity,
  ];
  const query =
    "INSERT INTO products (picUrlProd,title,category_id,sub_category,product_name,product_type,price,description,Store_Quantity) VALUES(?,?,?,?,?,?,?,?,?)";

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(201).json({ success: true, result });
  });
};
// create function to get product by id
const getProductbyId = (req, res) => {
  const productId = req.params.id_product;
  const data = [productId];
  const query = `SELECT * FROM PRODUCTS INNER JOIN CATEGORIES ON PRODUCTS.category_id=CATEGORIES.CATEGORY_ID INNER JOIN SUB_CATEGORIES ON PRODUCTS.sub_category=SUB_CATEGORIES.SUBCATEGORY_ID WHERE PRODUCTS.PRODUCT_ID=? AND PRODUCTS.IS_DELETED =0;`;

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, result });
  });
};

// create function to delete product by id
const deleteProductbyId = (req, res) => {
  const productId = req.params.id_product;
  const data = [productId];
  const query = `UPDATE  PRODUCTS SET IS_DELETED =1 WHERE product_ID=?;`;
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, result });
  });
};
// create function to update data in product
const updateProduct = (req, res) => {
  const {
    product_name,
    product_type,
    price,
    title,
    picUrlProd,
    description,
    category_id,
    sub_category,
    buy_price
  } = req.body;
  const productId = req.params.id;

  const data = [
    product_name,
    product_type,
    price,
    title,
    picUrlProd,
    description,
    category_id,
    sub_category,
    productId,
    buy_price
  ];

  const query =
    "UPDATE products SET product_name=?,product_type=?,price=?,title=?,picUrlProd=?,description=?,category_id=?,sub_category=?,buy_price=? WHERE product_ID=?";

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, result });
  });
};

const getprodactpagin = (req, res) => {
  const limit = 12;
  const page = req.params.page;

  const offset = (page - 1) * limit;

  // const query= "SELECT * FROM PRODUCTS  limit "+limit+" OFFSET "+offset "
  const query = "select * from Products limit " + limit + " OFFSET " + offset;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        mesage: "server error",
      });
    }
    res.status(201).json({
      success: true,
      result,
    });
  });
};
//query=`SELECT * FROM products  WHERE IS_DELETED=0 ORDER BY CAST(price AS INT)  DESC `;
const allProductDescending = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM products  WHERE IS_DELETED=0 AND category_id=? ORDER BY price DESC `;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "error server",
        err: err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "get all proudect by price descending",
      result,
    });
  });
};

const allProductascending = (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM products  WHERE IS_DELETED=0 AND category_id=? ORDER BY price ASC ";
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "error server",
        err: err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "get all proudect by price ascending",
      result,
    });
  });
};

const allProductByLetters = (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM products  WHERE IS_DELETED=0 AND category_id=? ORDER BY title";
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "error server",
        err: err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "get all proudect by price ascending",
      result,
    });
  });
};

const restockProduct = (req, res) => {
  const { newQuntity, product_Id } = req.body;
  const query =
    "UPDATE products SET Store_Quantity=Store_Quantity+? WHERE product_id=? AND IS_DELETED =0  ";
  const data = [newQuntity, product_Id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        mesage: "server error",
      });
    }
    res.status(201).json({
      success: true,
      result,
    });
  });
};





const getProdactPaginBuySub = (req, res) => {
  const limit = 12;
  const page = req.params.page;
  const id =req.body.id
  const data=[id]
  const offset = (page - 1) * limit;
  const query = "select * from Products WHERE Products.category_id=? limit " + limit + " OFFSET " + offset ;
  connection.query(query,data,(err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        mesage: "server error",
      });
    }
    res.status(201).json({
      success: true,
      result,
    });
  });
};












module.exports = {
  getAllProducts,
  createProduct,
  getProductbyId,
  deleteProductbyId,
  updateProduct,
  getprodactpagin,
  restockProduct,
  allProductDescending,
  allProductascending,
  allProductByLetters,
  getProdactPaginBuySub
};
