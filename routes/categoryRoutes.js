const express = require("express");

const router = express.Router();
const Categories = require("../models/categoryModel");
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

router
  .route("/")
  // .get(authController.protect, categoryController.getAllCategories)
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategrories);

router.route("/:id").get(categoryController.getCategoriesById);

// router.post("/", shopContoller.createCategrories);

module.exports = router;
