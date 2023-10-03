const User = require("../modles/userSchema");
const Validate = require("../middleware/joi_validation");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

exports.postLoginData = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userCheck = await User.findOne({ email });
  if (userCheck && (await bcrypt.compare(password, userCheck.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: userCheck.username,
          email: userCheck.email,
          id: userCheck.id,
        },
      },
      process.env.secretKey,
      { expiresIn: process.env.Range }
    );
    return accessToken;
  } else {
    res.status(401);
  }
});

exports.PostUserData = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const value = await Validate.userValidation.validateAsync();
  const hashpassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    username,
    email,
    password: hashpassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error(" user data not valid");
  }
});
