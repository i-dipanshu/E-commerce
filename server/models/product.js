import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Enter the a valid name of product"],
  },
  description: {
    type: String,
    required: [true, "Enter the a valid description of product"],
  },
  price: {
    type: Number,
    required: [true, "Enter the a valid price of producr"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: [true, "Enter a valid category of product"],
  },
  stock: {
    type: Number,
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {type: Schema.ObjectId, ref: "User", required: true },
      name: { type: String, required: [true, "Enter the a valid name"] },
      rating: { type: Number, default: 0 },
      comment: { type: String, required: [true, "Enter a valid comment"] },
    },
  ],
  user:{
    type: Schema.ObjectId,
    ref: "User",
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
