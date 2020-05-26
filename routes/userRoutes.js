const express = require("express");
const authController = require("../controllers/authController");
const profileController = require("../controllers/userProfileController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.route("/alluser").get(authController.getAllUser);

router.route("/profile").get(authController.getUserProfile);

router
  .route("/address")
  //   .get(authController.getAddress)
  .get(profileController.getAddressByUser)
  .post(authController.createAddress);

module.exports = router;
