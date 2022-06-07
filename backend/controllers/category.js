const res = require("express/lib/response");
const connection = require("../models/db");

// create function to create category
const createNewCategory = (req, res) => {
  const { category, picUrl } = req.body;

  const query = "INSERT INTO categories(category,picUrl) VALUES(?,?)";
  const data = [category, picUrl];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(201).json({ success: true, result });
  });
};

// create function to get all category
const getAllCategory = (req, res) => {
  const query = "SELECT * FROM categories WHERE IS_DELETED =0";
  connection.query(query, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, result });
  });
};
const getProductbyCategoryID = (req, res) => {
  const category_id = req.params.category_id;

  const query =
    "SELECT * FROM PRODUCTS LEFT JOIN CATEGORIES ON PRODUCTS.category_id=CATEGORIES.CATEGORY_ID LEFT JOIN SUB_CATEGORIES ON PRODUCTS.sub_category=SUB_CATEGORIES.SUBCATEGORY_ID WHERE  PRODUCTS.IS_DELETED=0 AND  products.category_id=?";
  const data = [category_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, result });
  });
};

module.exports = { createNewCategory, getAllCategory, getProductbyCategoryID };
