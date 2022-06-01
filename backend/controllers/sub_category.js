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

module.exports = { createNewSubCategory };
