import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto, { createHash } from 'crypto'

/* ------------------------------------------------------------------------------------- */

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a valid name"],
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [30, "Name must be at max 30 characters."],
  },
  email: {
    type: String,
    required: [true, "Please enter a valid Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Password should be of atleast 8 characters."],
    minLength: [8, "Password should be of atleast 8 characters."],
    select: false,
  },
  avatar: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

/* ------------------------------------------------------------------------------------- */

// methods

/* ------------------------------------------------------------------------------------- */

// this function runs before saving the document to database
userSchema.pre("save", async function (next) {
  // conditon to avoid hashing the already hashed password during updating the feilds
  if (!this.isModified("password")) {
    next();
  }

  // hashing the password
  this.password = await bcryptjs.hash(this.password, 10);
});

// JWT Token Generator
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

/* ------------------------------------------------------------------------------------- */

// comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

/* ------------------------------------------------------------------------------------- */

// Generate Reset Password Token
userSchema.methods.getResetPasswordToken = async function () {
  // creating a random hex string
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing Token and adding to resetPasswordToken
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Adding to resetPasswordExpire
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  // return the resetToken to mail to user
  return resetToken;
};

/* ------------------------------------------------------------------------------------- */

export default mongoose.model("User", userSchema);
