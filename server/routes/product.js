import express from 'express'

// controllers imports
import { getAllProduct } from '../controllers/product.js';

const router = express.Router();

// routes at 'api/v1/...'

router.route('/products').get(getAllProduct)


export default router;