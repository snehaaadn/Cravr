import mongoose from 'mongoose';

async function connectDB(url) {
    try {
        await mongoose.connect(url); // Create a different thread for DB connection
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to the database:", error);
    }
};


export {
    connectDB
}