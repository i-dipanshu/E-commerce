import handleAsyncErrors from "../middlewares/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

// model import
import Order from "../models/order.js";

/* ------------------------------------------------------------------------------- */

// create a new order
export const newOrder = handleAsyncErrors(async(req, res, next) => {
    // destruct feilds for the order from req.body
    const {shippingInfo, orderItems, paymentInfo, itemsPrice, tax, shippingCharge, totalPrice} = req.body;

    // create a new order using the above feilds | login required
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      tax,
      shippingCharge,
      totalPrice,
      paidAt: Date.now(),
      user: req.user.id
    });

    // response
    res.status(201).json({success: true, order});
});

/* ------------------------------------------------------------------------------- */

