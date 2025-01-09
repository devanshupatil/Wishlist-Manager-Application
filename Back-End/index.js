const express = require('express')
const app = express()
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const port = process.env.PORT
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');


// load environment variables from.env file
dotenv.config();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', productRouter, userRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


