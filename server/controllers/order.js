import handleAsyncErrors from "../middlewares/asyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

// model import
import Order from "../models/order.js";
import Product from "../models/product.js"

/* ------------------------------------------------------------------------------- */

// create a new order -- login required
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

// get single order
export const getOrder = handleAsyncErrors(async(req, res, next) => {
  // fetch the id from parameter and find the order
  const order = await Order.findById(req.params.id).populate("user", "name email");

  // if not found
  if(!order){
    return next(new ErrorHandler(404, "Order not found."));
  }

  // response
  res.status(200).json({success: true, order});
});

/* ------------------------------------------------------------------------------- */

// get all orders of a user | login required
export const myOrder = handleAsyncErrors(async(req, res, next) => {
  // fetch the order using the req.user.id
  const orders = await Order.find({ user: req.user.id });

  // response
  res.status(200).json({ success: true, orders });
});

/* ------------------------------------------------------------------------------- */

//  get all orders | admin
export const getAllOrders = handleAsyncErrors(async(req, res, next) => {
  // fetch all orders
  const orders = await Order.find().populate("user", "name email");

  // total price of all orders
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  // response
  res.status(200).json({ success: true, totalAmount, orders});
});

/* ------------------------------------------------------------------------------- */

// update order status
export const updateOrderStatus = handleAsyncErrors(async(req, res, next) => {
  // find the order
  const order = await Order.findById(req.params.id);

  // if not found
  if (!order) {
    next(new ErrorHandler(new ErrorHandler(404, "Order not found.")));
  }

  // if already delivered
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler(400, "You have already delivered this order"));
  }

  // update the stock if the order is delivered
  order.orderItems.forEach(async (order) => {
    await updateStock(order.productId, order.quantity);
  });

  // update the status of the order
  order.orderStatus = req.body.status;

  // if delivered, add a deliveredAt feild
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  // save the order
  await order.save({ validateBeforeSave: false });

  // response
  res
    .status(200)
    .json({ success: true, message: "Status updated successfully" });
});

/* -------------------------------------------------------------------------------------------- */

// helper function | updates the stock in product model
const updateStock = async(id, quantity) => {
  // find the product using its id
  const product = await Product.findById(id);

  // decrese the stock
  product.stock -= quantity;

  // save the product
  await product.save({ validateBeforeSave: false});
};

/* -------------------------------------------------------------------------------------------- */

// delete a order
export const deleteOrder = handleAsyncErrors(async(req, res, next) => {
  // find the order
  const order = await Order.findById(req.params.id);

  // if not found
  if(!order){
    next(new ErrorHandler(new ErrorHandler(404, "Order not found.")));
  }

  // delete the order
  await order.remove();

  // response
  res.status(200).json({success: true, message: "Order deleted Successfully"});
});

/* -------------------------------------------------------------------------------------------- */
