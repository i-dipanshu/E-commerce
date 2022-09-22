import express from "express";
import cookieParser from "cookie-parser";

// middleware imports
import handleError from "./middlewares/error.js";

// routes import
import product from "./routes/product.js";
import user from "./routes/user.js";
import order from "./routes/order.js";

// alias to express() function
const app = express();

// middlewares

// parses the request body into json <--> header's content-type must be application/json
app.use(express.json());

// middleware to parse cookies
app.use(cookieParser());

// middleware to handle all the errors
app.use(handleError);

// routes at 'localhost:5000/...'
app.use("/api/v1", product);

app.use("/api/v1", user);

app.use("/api/v1", order);

export default app;
