const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth/", auth, async (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    return res.status(
      "400".json({ name: error.name, message: error.message })
    );
  }
});

router.post("/register/", async (req, res) => {
  try {
    if (await User.findOne({ email: req.body.email }))
      throw Error(`user with the email ${req.body.email} already exists`);
    const user = new User(req.body);
    await user.save();
    const token = await user.generateToken();
    return res.cookie("AUTH_TOKEN", token).status(200).json({
      token,
      user,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ name: error.name, message: error.message });
  }
});

router.post("/login/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Authentication Error");
    }
    if (!(await user.comparePassword(req.body.password))) {
      throw new Error("Authentication Error");
    }
    let token = await user.generateToken();
    return res.cookie("AUTH_TOKEN", token).status(200).json({
      token,
      user,
    });
  } catch (error) {
    return res
      .status("400")
      .send({ name: error.name, message: error.message });
  }
});

router.post("/logout/", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      {
        _id: req.user._id,
        tokens: req.cookies.AUTH_TOKEN,
      },
      { $pull: { tokens: req.cookies.AUTH_TOKEN } }
    );
    return res.cookie("AUTH_TOKEN", "").status(200).json({
      success: true,
    });
  } catch (error) {
    res.status("400").send({ name: error.name, message: error.message });
  }
});

module.exports = router;
