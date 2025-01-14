const { User } = require("../models");
const bcrypt = require("bcrypt");

const registration = async (req, res) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      password: pass,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", data: req.body });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Password or email or both incorrect" });
    }
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) {
      return res
        .status(400)
        .json({ message: "Password or email or both incorrect" });
    }
    res.status(200).json({
      message: "User login successfully",
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { registration, login };
