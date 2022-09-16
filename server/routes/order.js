import express from 'express';
import { deleteOrder, getAllOrders, getOrder, myOrder, newOrder, updateOrderStatus } from '../controllers/order.js';

import { isUserAuthenticted, isRole } from "../middlewares/auth.js";

const router = express.Router();

// route at 'api/v1/...'

/* ------------------------------------------------------- */

// route to create a new order | login required
router.post("/order/new", isUserAuthenticted, newOrder);

// route to my orders | login required
router.get('/orders/me', isUserAuthenticted, myOrder);

// route a get single order | login required
router.get("/order/:id", isUserAuthenticted, getOrder);

/* --------------------     admin   ----------------------- */

// route to get all the orders
router.get("/admin/orders", isUserAuthenticted, isRole("admin"), getAllOrders);

// route to update the status of order
router.put("/admin/order/:id", isUserAuthenticted, isRole("admin"), updateOrderStatus);

// route to delete a order
router.delete("/admin/order/:id", isUserAuthenticted, isRole("admin"), deleteOrder);



export default router;