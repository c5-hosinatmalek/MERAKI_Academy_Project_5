const connection = require("../models/db");
require("dotenv").config();
const bcrypt = require("bcrypt");

// craete middlleware function ==> register
const register = async (req, res) => {
  const saltRound = +process.env.SALT_ROUND;
  const { email, password, name, country, role_id } = req.body;
  const hashPassword = await bcrypt.hash(password, saltRound);
  const query = `INSERT INTO users (email,password,name,country,role_id) VALUES (?,?,?,?,?)`;
  const data = [email, hashPassword, name, country, role_id];
  connection.query(query, data, (err, result) => {
    
    if (err) {
      res.status(500).json({
        success: false,
        message: "error server",
        err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "create account successfully",
      result: result,
    });
  });
};

module.exports = register;
