import express from 'express';
// middleware imports
import error from "./middlewares/erorr.js";
// routes import
import product from './routes/product.js';
import user from './routes/user.js'

const app = express();

// middlewares
app.use(express.json()); // parses the req into json where header's content-type is application/json
app.use(error);  // middleware to handle error

// routes at 'localhost:5000/...'
app.use('/api/v1', product);

app.use('/api/v1', user);


export default app;