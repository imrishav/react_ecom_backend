const User = require("../models/userModel");
const asyncCatch = require("../utils/asyncCatch");

exports.signup = asyncCatch(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser
    }
  });
});
