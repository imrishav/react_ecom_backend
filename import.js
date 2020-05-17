const fs = require("fs");
const mongoose = require("mongoose");
const Categories = require("./models/ShopSections");

mongoose
  .connect("mongodb://localhost:27017/ecom", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB Connection Succesfully");
  });

const tours = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

const importData = async () => {
  try {
    // await Tour.create(tours);
    await Categories.create(tours, { validateBeforeSave: false });
    // await User.create(tours, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importData();
