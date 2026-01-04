import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './connect.js';
import cors from 'cors';

// Routes
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import dishRoutes from './routes/dishRoutes.js';

dotenv.config();
const app = express();

const URI = process.env.MONGO_ATLAS_URI;
const PORT = process.env.PORT || 8000;

// DB connection (NON-BLOCKING)
connectDB(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Mongo error:", err));

// Middleware
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://cravr.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));


// Health + root (Render wake-up)
app.get("/", (req, res) => {
  res.json({ success: true, message: "Cravr backend live 🚀" });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/users/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/dishes', dishRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
