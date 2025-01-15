const express = require('express')
const app = express()
const dotenv = require('dotenv');
const supabase = require('./config/db');
const port = 4001
const productRouter = require('./routes/productRoutes');
const cors = require('cors');


// load environment variables from.env file
dotenv.config();

// Connect to database


// Middleware
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:3000',  // Local development
    'https://wishlist-manager-app.netlify.app',  // Production frontend
    'https://wishlist-manager-application.onrender.com'  // If needed
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api', productRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
