import express from 'express' 

// routes import
import product from './routes/product.js'

// middleware
const app = express();

// routes at 'localhost:5000/...'
app.use('/api/v1/', product)


export default app;