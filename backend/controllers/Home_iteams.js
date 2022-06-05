const connection = require("../models/db");

const additeam = (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  const query = "INSERT INTO pic (url,product_Id) VALUES(?,?)";
  const data = [url, id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        succses: false,
        err,
      });
    }
    res.status(202).json({
      succses: true,
      result,
    });
  });
};

const getpiciteam = (req, res) => {
  const query =
    "SELECT * FROM pic inner join Products on pic.product_Id=Products.product_Id ";
  connection.query(query, (err, resul) => {
    if (err) {
      res.json(500);
    }
    res.json(resul);
  });
};

const deletepiciteam = (req, res) => {
  const id = +req.params.id;
  const query = "DELETE FROM PIC where pic_id=?";
  const data = [+id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        succses: false,
        err,
      });
    }
    res.status(200).json({
      succses: false,
      result,
    });
  });
};

const updatepicitem = (req, res) => {
  const  id  = +req.params.id;
  const data = [id];
  const { url, product_Id } = req.body;
  const query = "SELECT * from pic where pic_id=?";
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        succses: false,
        err,
      });
    }

    const query = "UPDATE pic SET url=?, product_Id=? where pic_id =?";
    const data = [url || result[0].url, product_Id || result[0].product_Id, id];
    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          succses: false,
          err,
        });
      }
      res.status(203).json({
        succses: true,
        result,
      });
    });
  });
};

module.exports = { additeam, getpiciteam, deletepiciteam, updatepicitem };
