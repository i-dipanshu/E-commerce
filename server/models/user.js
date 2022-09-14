import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

// methods

// this function runs before saving the document to database
userSchema.pre("save", async function (next) {
  // conditon to avoid hashing the already hashed password during updating the feilds
  if (!this.isModified("password")) {
    next();
  }

  // hashing the password
  this.password = await bcryptjs.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES,});
};

// comparing password 
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

export default mongoose.model("User", userSchema);
