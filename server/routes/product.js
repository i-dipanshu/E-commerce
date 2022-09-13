import express from "express";

// controllers imports
import { getAllProduct,createProduct,updateProduct,deleteProduct,getProduct } from "../controllers/product.js";

const router = express.Router();

// routes at --> 'api/v1/...'

router.get("/products", getAllProduct); // route to list all products
router.get("/product/:id", getProduct); // route to list a produc
router.post("/product/new", createProduct); // route to create a new product
router.put("/product/:id", updateProduct); // route to update a existing product
router.delete("/product/:id", deleteProduct); // route to delete a existing product

export default router;
