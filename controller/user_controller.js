const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
    const access_token = jwt.sign({id: user.id, email: user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_VALIDITY}) 
    const refresh_token = jwt.sign({id: user.id, email: user.email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_VALIDITY}) 
    res.status(200).json({
      message: "User login successfully",
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        access_token: {
          token: access_token,
        expires_in: process.env.ACCESS_TOKEN_VALIDITY
        },
        refresh_token: {
          token: refresh_token,
        expires_in: process.env.REFRESH_TOKEN_VALIDITY
        }
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { registration, login };
