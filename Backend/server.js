import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './connect.js';

// Import Routes
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';

dotenv.config();
const app = express();

const URI = process.env.MONGO_ATLAS_URI;
const PORT = process.env.PORT || 6000;


connectDB(URI)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/users', userRoutes);
app.use('/api/users/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/restaurants', restaurantRoutes);


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});