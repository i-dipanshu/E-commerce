import express from "express";

// controllers imports
import { getAllProduct,createProduct,updateProduct,deleteProduct,getProduct } from "../controllers/product.js";

const router = express.Router();

/* --------   routes at --> 'api/v1/...' ------- */

// route to list all products
router.get("/products", getAllProduct); 

// route to create a new product
router.post("/product/new", createProduct); 

// route to --> list a product(get) | update a product (put) | delete a product(delete)
router.route("/product/:id").get(getProduct).put(updateProduct).delete(deleteProduct); 


export default router;
