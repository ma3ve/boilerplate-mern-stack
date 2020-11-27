const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true,
  },
  password: {
    type: String,
    minglength: 5,
    required: true,
  },
  firstname: {
    type: String,
    maxlength: 50,
    required: true,
  },
  lastname: {
    type: String,
    maxlength: 50,
    required: true,
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (user.isModified("password")) {
      let hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (plainPassword) {
  let isMatch = false;
  isMatch = await bcrypt.compare(plainPassword, this.password);
  return isMatch;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  let token = jwt.sign(
    { _id: user._id.toHexString() },
    process.env.JWT_SECRET_KEY
  );
  user.tokens.push(token);
  await user.save();
  return token;
};

userSchema.statics.findByToken = async function (token) {
  const _id = jwt.verify(token, process.env.JWT_SECRET_KEY)._id;
  const user = await User.findById(_id);
  return user;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
