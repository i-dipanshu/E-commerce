import express from "express";

import { isUserAuthenticted, isRole } from '../middlewares/auth.js';

// controllers imports
import { getAllProduct, createProduct, updateProduct, deleteProduct, getProduct } from "../controllers/product.js";

// alias to use express.Router()
const router = express.Router();

/* --------   routes at --> 'api/v1/...' ------- */

// route to list all products
router.get("/products", getAllProduct);

// route to create a new product
router.post("/product/new", isUserAuthenticted, isRole("admin"), isUserAuthenticted, createProduct); 

// route to --> list a product(get) | update a product (put) | delete a product(delete)
router.route("/product/:id").get(getProduct).put(isUserAuthenticted, isRole("admin"),updateProduct).delete(isUserAuthenticted, isRole("admin"), deleteProduct); 


/* ---------------------------------------------- */

export default router;
