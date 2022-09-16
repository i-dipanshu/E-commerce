import express from 'express';
import { newOrder } from '../controllers/order.js';

import { isUserAuthenticted, isRole } from "../middlewares/auth.js";

const router = express.Router();

// route at 'api/v1/...'

// route to create a new order
router.post("order/new", newOrder);

export default router;