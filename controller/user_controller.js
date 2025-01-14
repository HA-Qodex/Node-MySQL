const { User } = require("../models");
const bcrypt = require('bcrypt');

const userController = async (req, res) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      password: pass,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    });
    res
      .status(201)
      .json({ message: "User registered successfully", data: req.body });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = userController;
