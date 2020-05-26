const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    street: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    isPrimaryAddress: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

addressSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email",
  });

  next();
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
