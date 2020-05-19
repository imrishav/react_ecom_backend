const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    title: {
      type: String,
    },
    image: String,
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Categories",
    },
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
