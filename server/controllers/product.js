// model imports
import Product from "../models/product.js";

import asyncError from "../middlewares/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeature from "../utils/apiFeature.js";

// --------------------------------------------------------------------------------------------

// function to create a new product --> admin
export const createProduct = asyncError(async (req, res, next) => {
  // creates a new document in the product schema
  // from the json data from req.body
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// -----------------------------------------------------------------------------------------------------

//function to get all products from database
export const getAllProduct = asyncError(async (req, res) => {
  // (query, queryStr) --> queryStr is keywords
  const apiFeature = new ApiFeature(Product.find(), req.query).search().filter();
  // Creates a find query: gets a list of documents that match filter.
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// function to a details of a single product
export const getProduct = asyncError(async (req, res, next) => {
  // find a document of product using its id
  const product = await Product.findById(req.params.id);

  // and if product not found call middleware to handle error
  if (!product) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  // if the product is found return it as response
  res.status(200).json({
    success: true,
    product,
  });
});

// -------------------------------------------------------------------------------------------------------

//function to update a existing product
export const updateProduct = asyncError(async (req, res) => {
  // find the product from its id
  let product = await Product.findById(req.params.id);

  // if the product doesn't exits
  if (!product) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  // findByIdAndUpdate is nothing but findOneAndUpdate but by using _id filter
  // By default, findOneAndUpdate() returns the document as
  // it was before update was applied. If you set new: true,
  // findOneAndUpdate() will instead give you the object after update was applied.

  // updating the product
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // response
  res.status(200).json({
    success: true,
    product,
  });
});

// --------------------------------------------------------------------------------------------------------

//function to  delete a existing product from database
export const deleteProduct = asyncError(async (req, res, next) => {
  // finds a document using the id from the req
  const product = await Product.findById(req.params.id);

  // if the product is not found
  if (!product) {
    return next(ErrorHandler(404, "Product not found"));
  }

  // if the product is found
  // then delete the product
  await product.remove();

  // response
  res.status(200).json({
    success: true,
    message: "Product successfully deleted",
  });
});

// -----------------------------------------------------------------------------------------------------------
