const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const shopRoutes = require("./routes/shopRoutes");
const itemRoutes = require("./routes/itemsRoutes");

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

app.use("/shop", shopRoutes);
app.use("/items", itemRoutes);

app.listen(3001, console.log("Backedn Running.."));
