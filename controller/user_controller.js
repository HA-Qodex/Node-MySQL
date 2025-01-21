const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const XLSX = require('xlsx');
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
    const access_token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_VALIDITY }
    );
    const refresh_token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_VALIDITY }
    );
    res.status(200).json({
      message: "User login successfully",
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        access_token: {
          token: access_token,
          expires_in: process.env.ACCESS_TOKEN_VALIDITY,
        },
        refresh_token: {
          token: refresh_token,
          expires_in: process.env.REFRESH_TOKEN_VALIDITY,
        },
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addUsers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Read the file buffer using xlsx
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Parse the sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet);

    for( let i = 0; i < data.length; i++ ) {
      const user = data[i];
      const pass = await bcrypt.hash(user.password.toString(), 10);
      user.password = pass;
      data[i] = user;
    }

    const users = await User.bulkCreate(data);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error reading the Excel file' });
  }
}

const updateProfile = async (req, res) => {
  const userData = {};
  const { name, phone, address, password } = req.body;

  if (name) userData.name = name;
  if (phone) userData.phone = phone;
  if (address) userData.address = address;
  if (password) {
    const pass = await bcrypt.hash(password, 10);
    userData.password = pass;
  }

  if (Object.keys(userData).length === 0) {
    return res.status(400).json({ message: "No data to update" });
  }

  await User.update(userData, { where: { id: req.user.id } });
  res.status(200).json({ message: "User updated successfully" });

  try {
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProfilePhoto = async (req, res) => {
  try {
    await User.update({ image: req.file.path }, { where: { id: req.user.id } });
    res.status(200).json({
      message: "Image uploaded successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const showImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const filepath = path.join(__dirname, "../uploads", filename);

    // Check if the file exists
    if (fs.existsSync(filepath)) {
      res.sendFile(filepath);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  registration,
  login,
  addUsers,
  updateProfile,
  updateProfilePhoto,
  showImage,
};
