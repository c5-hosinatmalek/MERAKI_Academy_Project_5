const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "forbidden" });
  }

  const token = req.headers.authorization.split(" ").pop();

  jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: `The token is invalid or expired`,
      });
    } else {
      console.log(true);
      req.token = result;
      next();
      return;
    }
  });
};

module.exports = authentication;
