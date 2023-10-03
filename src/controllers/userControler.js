const asyncHandler = require("express-async-handler");
const userServer = require("../services/userServices");
const logiService = require("../services/userServices");
const User = require("../modles/userSchema");

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All feild are mandatory");
  }
  const useAvailable = await User.findOne({ email });
  if (useAvailable) {
    res.status(400);
    throw new Error("user already exit");
  }

  const user = await userServer.PostUserData(req, res);
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const accessToken = await logiService.postLoginData(req, res);
  if (accessToken) {
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

exports.currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
