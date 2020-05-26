const express = require("express");

const router = express.Router();
const Items = require("../models/itemsModel");
const authController = require("../controllers/authController");
const itemsController = require("../controllers/itemsController");

router
  .route("/")
  // .get(authController.protect, itemsController.getAllItems)
  .get(itemsController.getAllItems)
  .post(itemsController.createItems);

router.route("/:id").get(itemsController.getItemById);

// router.post("/", shopContoller.createCategrories);

module.exports = router;
