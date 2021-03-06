const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    title: {
      type: String,
    },
    imageUrl: String,
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Categories",
    },
    price: Number,
    categoryTitle: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

itemSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "title imageUrl",
  });

  next();
});

const Items = mongoose.model("Item", itemSchema);

module.exports = Items;
