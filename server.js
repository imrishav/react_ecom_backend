const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");

const morgan = require("morgan");
const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require("./routes/itemsRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const app = express();

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

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use("/categories", categoryRoutes);
app.use("/items", itemRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

app.listen(3001, console.log("Backedn Running.."));
