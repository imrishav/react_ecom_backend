const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// {
//     title: "hats",
//     imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
//     id: 1,
//     linkUrl: "shop/hats",
//   },

const categoriesSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
  },
  imageUrl: String,
  linkUrl: {
    type: String,
    default: "shop/",
  },
});

categoriesSchema.pre("save", function (next) {
  this.linkUrl += this.title;
  next();
});

const Categories = new mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
