const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
    },
    imageUrl: String,
    linkUrl: {
      type: String,
      default: "shop/",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categoriesSchema.virtual("category", {
  ref: "Item",
  foreignField: "category",
  localField: "_id",
});
categoriesSchema.virtual("testData").get(function () {
  return "rishav";
});

categoriesSchema.pre("save", function (next) {
  this.linkUrl += this.title;
  next();
});

const Categories = new mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
