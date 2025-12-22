import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './connect.js';

// Import Routes
import userRoutes from './routes/userRoutes.js';


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




// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});