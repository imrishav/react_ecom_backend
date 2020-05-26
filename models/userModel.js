const mongoogse = require("mongoose");
const Schema = mongoogse.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      validate: [validator.isEmail, "Please Provide valid Email"],
    },
    phone: {
      type: String,
      // required:true
    },
    photo: String,
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please Confirm password"],
      validate: {
        validator: function (e) {
          return e === this.password;
        },
        message: "Password are not same.",
      },
    },
    passwordChangedAt: Date,
    // address:[{
    //   type: mongoogse.Schema.ObjectId,
    //   ref: "Address"
    // }],
    cards: [String],
    orders: [String],
    wishList: [String],
    // reviews: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.virtual("address", {
  ref: "Address",
  foreignField: "user",
  localField: "_id",
});

userSchema.virtual("review", {
  ref: "Review",
  foreignField: "user",
  localField: "_id",
});

userSchema.methods.correctPass = async function (passedPass, userPass) {
  console.log(passedPass, userPass);
  return await bcrypt.compare(passedPass, userPass);
};

userSchema.methods.changePasswordAfter = function (JWTtimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTtimeStamp < changedTimeStamp;
  }
  //Not Changed Password
  return false;
};

const User = new mongoogse.model("User", userSchema);

module.exports = User;
