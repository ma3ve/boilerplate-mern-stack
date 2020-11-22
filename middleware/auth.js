const { Error } = require("mongoose");
const { User } = require("../models/User");

let auth = async (req, res, next) => {
  try {
    let token = req.cookies.AUTH_TOKEN;
    if (!token) throw new Error("Token not provided");
    req.user = await User.findByToken(token);

    next();
  } catch (error) {
    return res
      .status(400)
      .send({ name: error.name, message: error.message });
  }
};

module.exports = { auth };
