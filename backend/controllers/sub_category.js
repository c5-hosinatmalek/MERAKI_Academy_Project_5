const connection = require("../models/db");

// create function to create sub_category
const createNewSubCategory = (req, res) => {
  const { sub_category, picUrl } = req.body;

  const query = "INSERT INTO sub_categories(sub_category,picUrl) VALUES(?,?)";
  const data = [sub_category, picUrl];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(201).json({ success: true, result });
  });
};
// get all sub category
const getSubCategory = (req, res) => {
  const query = "SELECT * FROM sub_categories";
  connection.query(query, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, result });
  });
};
const getSubCategoryBycategoryId=(req,res)=>{
  const category_id=req.params.category_id
  const data =[category_id]
  const query = "SELECT * FROM sub_categories where category_id=?";
  connection.query(query,data, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, result });
  });
}
const getProductBySubCategory=(req,res)=>{
  const {subCatgory_id} =req.params
  const data =[subCatgory_id]
  const query = "SELECT * FROM products inner join sub_categories on products.sub_category=sub_categories.subCategory_id where products.sub_category=?";
  connection.query(query,data, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, result });
  });
}

module.exports = { createNewSubCategory,getSubCategory,getSubCategoryBycategoryId,getProductBySubCategory };
