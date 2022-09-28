import express from 'express';
import { deleteOrder, getAllOrders, getOrder, myOrder, newOrder, updateOrderStatus } from '../controllers/order.js';

import { isUserAuthenticated, isRole } from "../middlewares/auth.js";

const router = express.Router();

// route at 'api/v1/...'

/* ------------------------------------------------------- */

// route to create a new order | login required
router.post("/order/new", isUserAuthenticated, newOrder);

// route to my orders | login required
router.get('/orders/me', isUserAuthenticated, myOrder);

// route a get single order | login required
router.get("/order/:id", isUserAuthenticated, getOrder);

/* --------------------     admin   ----------------------- */

// route to get all the orders
router.get("/admin/orders", isUserAuthenticated, isRole("admin"), getAllOrders);

// route to update the status of order
router.put("/admin/order/:id", isUserAuthenticated, isRole("admin"), updateOrderStatus);

// route to delete a order
router.delete("/admin/order/:id", isUserAuthenticated, isRole("admin"), deleteOrder);



export default router;