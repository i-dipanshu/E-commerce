import handleAsyncErrors from "../middlewares/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeature from "../utils/apiFeature.js";

// model imports
import Product from "../models/product.js";

/* -------------------------------------------------------------------------------------------- */

// function to create a new product --> admin

export const createProduct = handleAsyncErrors(async (req, res, next) => {
  // user is appended to req early hand by isUserAuthenticated
  // appends id from req.user to req.body.user
  req.body.user = req.user.id;
  // creates a new document in the product schema
  // from the json data from req.body
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

/* -------------------------------------------------------------------------------------------- */

//function to get all products from database

export const getAllProduct = handleAsyncErrors(async (req, res) => {

  // product per page
  const resultperpage = 5;

  // total no. of products in database
  const productCount = await Product.countDocuments();

  // (query, queryStr) --> queryStr is keywords
  // api features --> search, filter category, pagination
  const apiFeature = new ApiFeature(Product.find(), req.query).search().filter().pagination(resultperpage);

  // Creates a find query: gets a list of documents that match filter.
  const products = await apiFeature.query;

  // response
  res.status(200).json({success: true,products,productCount,});
});

/* -------------------------------------------------------------------------------------------- */

// function to a details of a single product

export const getProduct = handleAsyncErrors(async (req, res, next) => {

  // find a document of product using its id
  const product = await Product.findById(req.params.id);

  // and if product not found call middleware to handle error
  if (!product) {
    return next(new ErrorHandler(404, "Product not found."));
  }

  // if the product is found return it as response
  res.status(200).json({success: true, product,});
});

/* -------------------------------------------------------------------------------------------- */

//function to update a existing product

export const updateProduct = handleAsyncErrors(async (req, res, next) => {

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

  // updating the feild of the product 
  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false,});

  // response
  res.status(200).json({ success: true, product,});
});

/* -------------------------------------------------------------------------------------------- */

//function to  delete a existing product from database

export const deleteProduct = handleAsyncErrors(async (req, res, next) => {
  
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

/* -------------------------------------------------------------------------------------------- */

// Create a review or update it

export const createProductReview = handleAsyncErrors(async (req, res, next) => {
  // destrucrt rating, comment and product from req body
  const { rating, comment, productId } = req.body;

  // store the document feild (reviews feilds)
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  //find the product using its id
  const product = await Product.findById(productId);

  // checking there if a review already exists with the user
  const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user.id.toString());

  // if yes, just update it
  if(isReviewed){
    product.reviews.forEach(rev => {
      // checking for user in rev and user logged in are same 
      if(rev.user.toString() === req.user._id.toString()){
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  }else{
    // if not push the whole review object in reviews
    product.reviews.push(review);

    // updating the number of reviews in product
    product.numOfReviews = product.reviews.length;
  }

  // average rating calculation
  let avgRating = 0;
  product.reviews.forEach(rev => {
    avgRating += rev.rating;
  });
  
  // updating the ratings
  product.ratings = avgRating / product.reviews.length;

  // finally, save the document
  await product.save({ validateBeforeSave: false });

  // response
  res.status(200).json({success: true});
});

/* ---------------------------------------------------------------------------------------- */

// get all reviews 
export const getAllReviews = handleAsyncErrors( async(req, res, next) => {
  // find the product using the productId in query
  const product = await Product.findById(req.query.productId);

  // if product not found
  if(!product){
    return next(new ErrorHandler(404, "Product not found"))
  }

  // if found, fetch the reviews of the product
  const reviews = product.reviews;

  // response
  res.status(200).json({success:true, reviews});
});

/* ----------------------------------------------------------------------------------------- */

// delete a review -- login required
export const deleteReview = handleAsyncErrors(async(req, res, next) => {
  const product = await Product.findById(req.query.productId);

  // if product not found
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  // filter the review to be deleted from reviews
  const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id);

  // update the ratings and no of reviews
  let avgRating = 0;
  reviews.forEach((rev) => {
    avgRating += rev.rating;
  });

  // updating the ratings
  const ratings = avgRating / reviews.length;
  const numOfReviews = reviews.length;

  // updating in the database
  await Product.findByIdAndUpdate(req.query.productId, { reviews, ratings, numOfReviews}, {new: true, runValidators: true, useFindAndModify: false});

  // response
  res.status(200).json({success: true, message: "Review Deleted Successfully"});
  
});

/* -------------------------------------------------------------------------------------------------------- */