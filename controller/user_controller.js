const { User } = require("../models");

const userController = async (req, res) => {
  try {
    const user = await User.create({name: req.body.name, email: req.body.email});
    res
      .status(201)
      .json({ message: "Data received successfully", data: user });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message});
  }
};

module.exports = userController;
