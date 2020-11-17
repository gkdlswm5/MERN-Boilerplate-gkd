const mongoose = require("mongoose");
const crypto = require("crypto");

//user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    hashed_password: {
      //tbd
      type: String,
      trim: true,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      //normal / admin .. etc
      default: "Normal",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

//virtual password
userSchema
  .virtual("password")
  .set(function (password) {
    this.password = password;
    this.salt = this.makeSalt();
    this.hash_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  //generate salt
  makeSalt: function () {
    return Math.round(newDate().valueOf() * Math.random() + "");
  },
};
