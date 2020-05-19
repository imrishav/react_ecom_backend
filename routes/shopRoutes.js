const express = require("express");

const router = express.Router();
const Categories = require("../models/ShopSections");
const shopContoller = require("../controllers/shopControllers");

router
  .route("/")
  .get(shopContoller.getAllCategories)
  .post(shopContoller.createCategrories);

router.route("/:id").get(shopContoller.getCategoriesById);

// router.post("/", shopContoller.createCategrories);

module.exports = router;
