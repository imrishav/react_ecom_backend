const mongoogse = require("mongoose");
const Schema = mongoogse.Schema;
const validator = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate: [validator.isEmail, "Please Provide valid Email"]
  },
  phone: {
    type: String
    // required:true
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: 6
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please Confirm password"]
  },
  address: [String],
  cards: [String],
  orders: [String],
  wishList: [String],
  reviews: [String]
});

const User = new mongoogse.model("User", userSchema);

module.exports = User;
