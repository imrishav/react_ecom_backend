const express = require("express");

const router = express.Router();
const Items = require("../models/itemsModel");
const itemsController = require("../controllers/itemsControllers");

router
  .route("/")
  .get(itemsController.getAllItems)
  .post(itemsController.createItems);

// router.post("/", shopContoller.createCategrories);

module.exports = router;
