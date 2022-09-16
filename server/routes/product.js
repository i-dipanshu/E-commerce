import express from "express";

import { isUserAuthenticted, isRole } from '../middlewares/auth.js';

// controllers imports
import { getAllProduct, createProduct, updateProduct, deleteProduct, getProduct, createProductReview, getAllReviews, deleteReview } from "../controllers/product.js";

// alias to use express.Router()
const router = express.Router();

/* --------   routes at --> 'api/v1/...' ------- */

// route to list all products
router.get("/products", getAllProduct);

// route to a single product and its details
router.get("/product/:id", getProduct);

// add or update product reviews - login required
router.put("/review", isUserAuthenticted, createProductReview);

// get all reviews
router.get('/reviews', getAllReviews);

// delete a review - login required
router.delete("/review", isUserAuthenticted, deleteReview);

/* --------- auth and admin roles ------ */

// route to create a new product
router.post("/admin/product/new", isUserAuthenticted, isRole("admin"), createProduct); 

// route to --> list a product(get) | update a product (put) | delete a product(delete)
router.route("/admin/product/:id").put(isUserAuthenticted, isRole("admin"),updateProduct).delete(isUserAuthenticted, isRole("admin"), deleteProduct); 

/* ---------------------------------------------- */

export default router;
