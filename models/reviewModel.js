const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    photos: [String],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: mongoose.Schema.ObjectId,
      ref: "Item",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email",
  }).populate({
    path: "item",
    select: "title image price",
  });

  next();
});

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
