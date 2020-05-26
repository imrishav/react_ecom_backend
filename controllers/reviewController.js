const Review = require("../models/reviewModel");
const asyncCatch = require("../utils/asyncCatch");

exports.createReview = asyncCatch(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newReview,
    },
  });
});

exports.getAllReview = asyncCatch(async (req, res, next) => {
  const review = await Review.find();
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});
