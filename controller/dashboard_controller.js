const { User } = require("../models");
const jwt = require("jsonwebtoken");

const fetchData = async (req, res) => {
    res.status(200).json({ message: "Data fetched successfully", user: req.user });
}

module.exports = { fetchData };