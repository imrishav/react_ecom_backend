const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const asyncCatch = require("../utils/asyncCatch");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = asyncCatch(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body;

  // 1 check if email & password exist
  if (!email || !password) {
    console.log("need email");
    throw "dasda"; // Error Handling
  }
  // 2 check if user exist and password iscorrect
  const user = await User.findOne({ email }).select(
    "+password -address -orders"
  );

  if (!user || !(await user.correctPass(password, user.password))) {
    console.log("incorrect email or pass");
    res.status(400).json({
      status: "failure",
      message: "Not Foung",
    }); // Error Handling
  }

  const { name, userEmail = email, _id } = user;
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    data: {
      token,
      displayName: name,
      userEmail,
      id: _id,
    },
  });
});

exports.protect = asyncCatch(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      status: "failure",
      message: "Not Logged IN",
    }); //Error Handling
  }

  // Verify token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user still exist
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    res.status(401).json({
      status: "failure",
      message: "The user doesnt exist",
    });

    // return next(new AppError('The user doesnt exist',401))
  }

  if (freshUser.changePasswordAfter(decoded.iat)) {
    res.status(401).json({
      status: "failure",
      message: "User Recenetly changed Password",
    });
    //  return next(new AppError('User Recenetly changed Password'))
  }
  req.user = freshUser;
  next();
});

exports.getAllUser = asyncCatch(async (req, res, next) => {
  const users = await User.find().populate("address");
  res.status(200).json({
    status: "Success",
    results: users.length,
    data: {
      users,
    },
  });
  next();
});

exports.getUserProfile = asyncCatch(async (req, res, next) => {
  const user = await User.findById(req.body.id).populate("review address");

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

exports.getAddress = asyncCatch(async (req, res, next) => {
  const address = await Address.find();

  res.status(200).json({
    status: "Success",
    results: address.length,
    data: {
      address,
    },
  });
});

exports.createAddress = asyncCatch(async (req, res, next) => {
  const newAddress = await Address.create(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      newAddress,
    },
  });
});
