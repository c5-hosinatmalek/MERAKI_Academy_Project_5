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
const getAllCategory=(req,res)=>{
    const query="SELECT * FROM categories WHERE IS_DELETED =0"
    connection.query(query,(err,result)=>{
        if (err) {

            return res.json({success:false,err})
        }
        res.status(200).json({success:true,result})
    })
}


module.exports = { createNewCategory,getAllCategory };
