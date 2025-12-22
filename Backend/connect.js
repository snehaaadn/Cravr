import mongoose from 'mongoose';

async function connectDB(url) {
    await mongoose.connect(url); // Create a different thread for DB connection
};

export {
    connectDB
}