const { User } = require("../models");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (authHeader === undefined) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, tokenData) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const userData = await User.findByPk(tokenData.id, {
      attributes: ["id", "name", "email", "phone", "address"],
    });
    req.user = userData;
    next();
  });
};

module.exports = { verifyToken };
