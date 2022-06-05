import res from "express/lib/response";
import { connect } from "../models/db";

const Additeam = () => {
  const { img, id } = req.params.id;
  const query = "INSERT INTO pic (img,id) VALUES(?,?)";
  const data = [img, id];
  connect.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
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

module.exports = {Additeam,};
