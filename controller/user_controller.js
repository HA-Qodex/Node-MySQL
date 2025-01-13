const { User } = require("../models");
const { validationResult } = require("express-validator");

const userController = async (req, res) => {
  console.log(res);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
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
