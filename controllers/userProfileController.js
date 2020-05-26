const User = require("../models/userModel");
const Address = require("../models/addressModel");
const asyncCatch = require("../utils/asyncCatch");

exports.getAddressByUser = asyncCatch(async (req, res, next) => {
  const address = await Address.find({
    user: req.body.userid,
  }).populate("user");

  res.status(200).json({
    status: "success",
    data: {
      address,
    },
  });
});
